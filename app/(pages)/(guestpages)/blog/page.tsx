import AuthorBioSection from '@/app/components/guestpagecomponents/authorbioblog';
import BodyContentSection from '@/app/components/guestpagecomponents/bodycontentblog';
import CTASection from '@/app/components/guestpagecomponents/ctablog';
import CommentsSection from '@/app/components/guestpagecomponents/commentsblog';
import Footer from '@/app/components/footer';
import Head from 'next/head';
import HeroSection from '@/app/components/guestpagecomponents/heroblog';
import IntroductionSection from '@/app/components/guestpagecomponents/introductionblog';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import React from 'react';
import RelatedPostsSection from '@/app/components/guestpagecomponents/relatedpostblog';
import SubheadingsSection from '@/app/components/guestpagecomponents/subheadingblog';

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
