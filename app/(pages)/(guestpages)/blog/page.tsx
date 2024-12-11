import AuthorBioSection from '@/app/components/guestpagecomponents/blogcomponents/authorbioblog';
import BodyContentSection from '@/app/components/guestpagecomponents/blogcomponents/bodycontentblog';
import CTASection from '@/app/components/guestpagecomponents/blogcomponents/ctablog';
import CommentsSection from '@/app/components/guestpagecomponents/blogcomponents/commentsblog';
import Footer from '@/app/components/footer';
import Head from 'next/head';
import HeroSection from '@/app/components/guestpagecomponents/blogcomponents/heroblog';
import IntroductionSection from '@/app/components/guestpagecomponents/blogcomponents/introductionblog';
import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import React from 'react';
import RelatedPostsSection from '@/app/components/guestpagecomponents/blogcomponents/relatedpostblog';
import SubheadingsSection from '@/app/components/guestpagecomponents/blogcomponents/subheadingblog';

const BlogPost: React.FC = () => {
    return (
        <React.Fragment>
            <Head>
                <title>Blog Post</title>
                <meta name="description" content="This is a blog post" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <HeroSection />
            <IntroductionSection content={''} />
            <SubheadingsSection subheadings={[]} />
            <BodyContentSection content={''} />
            <CTASection ctaText={''} />
            <RelatedPostsSection posts={[]} />
            <AuthorBioSection author={{
                name: '',
                bio: '',
                imageUrl: ''
            }} />
            <CommentsSection comments={[]} />
            <Footer />
        </React.Fragment>
    );
};

export default BlogPost;
