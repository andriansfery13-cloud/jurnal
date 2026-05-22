<?php

namespace App\Notifications;

use App\Models\Submission;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ArticlePublishedNotification extends Notification
{
    use Queueable;

    public $submission;

    /**
     * Create a new notification instance.
     */
    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = route('articles.show', $this->submission->id);

        return (new MailMessage)
                    ->subject('Congratulations! Your Article has been Published')
                    ->greeting('Hello ' . $notifiable->name . ',')
                    ->line('We are delighted to inform you that your manuscript titled "' . $this->submission->title . '" has been successfully published.')
                    ->line('You can view your published article at the link below:')
                    ->action('View Published Article', $url)
                    ->line('Thank you for contributing your research to our journal!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'submission_id' => $this->submission->id,
            'title' => $this->submission->title,
        ];
    }
}
