import GuestLayout from '@/Layouts/GuestLayout';
import HeroSection from '@/Components/Landing/HeroSection';
import StatsSection from '@/Components/Landing/StatsSection';
import CurrentIssue from '@/Components/Landing/CurrentIssue';
import CallForPapers from '@/Components/Landing/CallForPapers';
import EditorialTeam from '@/Components/Landing/EditorialTeam';

export default function Landing({ journal, currentIssue, latestArticles, stats, editorialBoard }) {
    return (
        <GuestLayout journal={journal} meta={{ description: journal?.description || 'Scientific Journal Platform' }}>
            <HeroSection journal={journal} stats={stats} />
            <StatsSection stats={stats} />
            <CurrentIssue issue={currentIssue} articles={latestArticles || []} />
            <CallForPapers />
            <EditorialTeam members={editorialBoard || []} />
        </GuestLayout>
    );
}
