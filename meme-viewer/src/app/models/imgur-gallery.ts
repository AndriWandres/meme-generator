import { ImgurImage } from './imgur-image';
import { ImgurTag } from './imgur-tag';

export interface ImgurGallery {
    id: string;
    title: string;
    description: string;
    datetime: number;
    cover: string;
    cover_width: number;
    cover_height: number;
    account_url: string;
    account_id: number;
    privacy: string;
    layout: string;
    views: number;
    link: string;
    ups: number;
    downs: number;
    points: number;
    score: number;
    is_album: boolean;
    vote: any; // todo strong type
    favorite: boolean;
    nsfw: boolean;
    section: string;
    comment_count: number;
    favorite_count: number;
    topic: string;
    topic_id: number;
    images_count: number;
    in_gallery: boolean;
    is_ad: boolean;
    tags: ImgurTag[];
    ad_type: number;
    ad_url: string;
    in_most_viral: boolean;
    include_album_ads: boolean;
    images: ImgurImage[];
}
