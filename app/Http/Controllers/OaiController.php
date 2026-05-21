<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OaiController extends Controller
{
    protected $repositoryName = "Jurnal Ilmiah Repository";
    protected $adminEmail = "admin@jurnal.ac.id";
    
    /**
     * Handle OAI-PMH 2.0 Requests
     */
    public function handle(Request $request)
    {
        $verb = $request->query('verb');
        
        $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/ http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd"></OAI-PMH>');
        $xml->addChild('responseDate', gmdate('Y-m-d\TH:i:s\Z'));
        
        $requestNode = $xml->addChild('request', url('/api/oai'));
        foreach ($request->query() as $key => $value) {
            $requestNode->addAttribute($key, htmlspecialchars($value));
        }

        if (empty($verb)) {
            $this->addError($xml, 'badVerb', 'Illegal OAI verb');
            return response($xml->asXML(), 200)->header('Content-Type', 'text/xml');
        }

        switch ($verb) {
            case 'Identify':
                $this->identify($xml);
                break;
            case 'ListMetadataFormats':
                $this->listMetadataFormats($xml);
                break;
            case 'ListSets':
                $this->listSets($xml); // Simplified for now
                break;
            case 'ListIdentifiers':
                $this->listIdentifiers($xml, $request);
                break;
            case 'ListRecords':
                $this->listRecords($xml, $request);
                break;
            case 'GetRecord':
                $this->getRecord($xml, $request);
                break;
            default:
                $this->addError($xml, 'badVerb', "Illegal OAI verb: {$verb}");
        }

        return response($xml->asXML(), 200)->header('Content-Type', 'text/xml');
    }

    protected function identify(\SimpleXMLElement $xml)
    {
        $identify = $xml->addChild('Identify');
        $identify->addChild('repositoryName', htmlspecialchars($this->repositoryName));
        $identify->addChild('baseURL', url('/api/oai'));
        $identify->addChild('protocolVersion', '2.0');
        $identify->addChild('adminEmail', $this->adminEmail);
        
        $earliest = Submission::where('status', 'published')->min('published_at');
        $earliestDate = $earliest ? Carbon::parse($earliest)->format('Y-m-d\TH:i:s\Z') : gmdate('Y-m-d\TH:i:s\Z');
        
        $identify->addChild('earliestDatestamp', $earliestDate);
        $identify->addChild('deletedRecord', 'no');
        $identify->addChild('granularity', 'YYYY-MM-DDThh:mm:ssZ');
    }

    protected function listMetadataFormats(\SimpleXMLElement $xml)
    {
        $formats = $xml->addChild('ListMetadataFormats');
        $format = $formats->addChild('metadataFormat');
        $format->addChild('metadataPrefix', 'oai_dc');
        $format->addChild('schema', 'http://www.openarchives.org/OAI/2.0/oai_dc.xsd');
        $format->addChild('metadataNamespace', 'http://www.openarchives.org/OAI/2.0/oai_dc/');
    }

    protected function listSets(\SimpleXMLElement $xml)
    {
        $this->addError($xml, 'noSetHierarchy', 'This repository does not support sets');
    }

    protected function listIdentifiers(\SimpleXMLElement $xml, Request $request)
    {
        if ($request->query('metadataPrefix') !== 'oai_dc') {
            $this->addError($xml, 'cannotDisseminateFormat', 'Metadata format not supported');
            return;
        }

        $records = $this->getPublishedSubmissions($request);

        if ($records->isEmpty()) {
            $this->addError($xml, 'noRecordsMatch', 'No matching records found');
            return;
        }

        $list = $xml->addChild('ListIdentifiers');
        foreach ($records as $record) {
            $header = $list->addChild('header');
            $header->addChild('identifier', "oai:jurnal.ac.id:article/{$record->id}");
            $header->addChild('datestamp', Carbon::parse($record->published_at)->format('Y-m-d\TH:i:s\Z'));
        }
    }

    protected function listRecords(\SimpleXMLElement $xml, Request $request)
    {
        if ($request->query('metadataPrefix') !== 'oai_dc') {
            $this->addError($xml, 'cannotDisseminateFormat', 'Metadata format not supported');
            return;
        }

        $records = $this->getPublishedSubmissions($request);

        if ($records->isEmpty()) {
            $this->addError($xml, 'noRecordsMatch', 'No matching records found');
            return;
        }

        $list = $xml->addChild('ListRecords');
        foreach ($records as $record) {
            $this->addRecordNode($list, $record);
        }
    }

    protected function getRecord(\SimpleXMLElement $xml, Request $request)
    {
        $identifier = $request->query('identifier');
        if (!$identifier) {
            $this->addError($xml, 'badArgument', 'Missing identifier argument');
            return;
        }

        // Expected format: oai:jurnal.ac.id:article/123
        $parts = explode('/', $identifier);
        $id = end($parts);

        $record = Submission::with('authors')->where('status', 'published')->find($id);

        if (!$record) {
            $this->addError($xml, 'idDoesNotExist', 'No matching identifier in repository');
            return;
        }

        if ($request->query('metadataPrefix') !== 'oai_dc') {
            $this->addError($xml, 'cannotDisseminateFormat', 'Metadata format not supported');
            return;
        }

        $getRecord = $xml->addChild('GetRecord');
        $this->addRecordNode($getRecord, $record);
    }

    protected function getPublishedSubmissions(Request $request)
    {
        $query = Submission::with('authors')->where('status', 'published');
        
        if ($request->has('from')) {
            $query->where('published_at', '>=', Carbon::parse($request->query('from')));
        }
        if ($request->has('until')) {
            $query->where('published_at', '<=', Carbon::parse($request->query('until')));
        }

        return $query->get();
    }

    protected function addRecordNode(\SimpleXMLElement $parent, Submission $record)
    {
        $recordNode = $parent->addChild('record');
        
        $header = $recordNode->addChild('header');
        $header->addChild('identifier', "oai:jurnal.ac.id:article/{$record->id}");
        $header->addChild('datestamp', Carbon::parse($record->published_at)->format('Y-m-d\TH:i:s\Z'));

        $metadata = $recordNode->addChild('metadata');
        $dc = $metadata->addChild('oai_dc:dc', null, 'http://www.openarchives.org/OAI/2.0/oai_dc/');
        $dc->addAttribute('xmlns:dc', 'http://purl.org/dc/elements/1.1/');
        $dc->addAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        $dc->addAttribute('xsi:schemaLocation', 'http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd');

        $dc->addChild('dc:title', htmlspecialchars($record->title), 'http://purl.org/dc/elements/1.1/');
        foreach ($record->authors as $author) {
            $dc->addChild('dc:creator', htmlspecialchars($author->name), 'http://purl.org/dc/elements/1.1/');
        }
        $dc->addChild('dc:description', htmlspecialchars($record->abstract), 'http://purl.org/dc/elements/1.1/');
        $dc->addChild('dc:date', Carbon::parse($record->published_at)->format('Y-m-d'), 'http://purl.org/dc/elements/1.1/');
        $dc->addChild('dc:type', 'Text', 'http://purl.org/dc/elements/1.1/');
        $dc->addChild('dc:identifier', url("/articles/{$record->id}"), 'http://purl.org/dc/elements/1.1/');
        
        if ($record->doi) {
            $dc->addChild('dc:identifier', "doi:{$record->doi}", 'http://purl.org/dc/elements/1.1/');
        }
        $dc->addChild('dc:language', 'en', 'http://purl.org/dc/elements/1.1/');
    }

    protected function addError(\SimpleXMLElement $xml, $code, $message)
    {
        $error = $xml->addChild('error', htmlspecialchars($message));
        $error->addAttribute('code', $code);
    }
}
