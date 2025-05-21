import AuthorBioSection from '@/app/components/guestpagecomponents/authorbioblog';
import BodyContentSection from '@/app/components/guestpagecomponents/bodycontentblog';
import CTASection from '@/app/components/guestpagecomponents/ctablog';
import CommentsSection from '@/app/components/guestpagecomponents/commentsblog';
import Footer from '@/app/components/guestpagecomponents/FooterSection';
import Head from 'next/head';
import HeroSection from '@/app/components/guestpagecomponents/heroblog';
import IntroductionSection from '@/app/components/guestpagecomponents/introductionblog';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import React from 'react';
import RelatedPostsSection from '@/app/components/guestpagecomponents/relatedpostblog';
import SubheadingsSection from '@/app/components/guestpagecomponents/subheadingblog';

export default function BlogPost() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>SBB DAO - Blog</title>
                <meta name="description" content="Insights, updates, and stories from our community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            {/* Fixed Navbar */}
            <Navbar />
            
            {/* Main Content with padding-top to account for fixed navbar */}
            <main className="pt-16">
                {/* Hero Section */}
                <section id="hero">
                    <HeroSection />
                </section>
                
                {/* Introduction Section */}
                <section id="introduction">
                    <IntroductionSection content={'Welcome to our blog where we share insights about supporting black-owned businesses and community development.'} />
                </section>
                
                {/* Subheadings Section */}
                <section id="subheadings">
                    <SubheadingsSection subheadings={[
                        {
                            title: 'The Importance of Supporting Black-Owned Businesses',
                            content: 'Supporting black-owned businesses helps create economic opportunities and strengthens communities.'
                        },
                        {
                            title: 'Building Strong Communities Through Economic Empowerment',
                            content: 'Economic empowerment is a key factor in building strong, resilient communities.'
                        },
                        {
                            title: 'How Technology Can Bridge Gaps in Access and Opportunity',
                            content: 'Technology plays a crucial role in bridging gaps in access and creating new opportunities for businesses.'
                        }
                    ]} />
                </section>
                
                {/* Body Content Section */}
                <section id="body-content">
                    <BodyContentSection content={'This is the main content of the blog post. It discusses various topics related to supporting black-owned businesses and community development.'} />
                </section>
                
                {/* CTA Section */}
                <section id="cta">
                    <CTASection ctaText={'Join our community today to support black-owned businesses and contribute to community development.'} />
                </section>
                
                {/* Related Posts Section */}
                <section id="related-posts">
                    <RelatedPostsSection posts={[
                        {
                            id: '1',
                            title: 'How to Start Your Own Business',
                            excerpt: 'A guide to starting your own business from scratch.',
                            imageUrl: '/images/sbblogo.png'
                        },
                        {
                            id: '2',
                            title: 'The Power of Community Support',
                            excerpt: 'Learn how community support can help businesses thrive.',
                            imageUrl: '/images/sbblogo.png'
                        },
                        {
                            id: '3',
                            title: 'Leveraging Technology for Business Growth',
                            excerpt: 'Discover how technology can help your business grow.',
                            imageUrl: '/images/sbblogo.png'
                        }
                    ]} />
                </section>
                
                {/* Author Bio Section */}
                <section id="author-bio">
                    <AuthorBioSection author={{
                        name: 'John Doe',
                        bio: 'John is a passionate advocate for black-owned businesses and community development with over 10 years of experience in business consulting and community organizing.',
                        imageUrl: '/images/sbblogo.png',
                        socialLinks: {
                            twitter: 'https://twitter.com',
                            linkedin: 'https://linkedin.com',
                            website: 'https://example.com'
                        }
                    }} />
                </section>
                
                {/* Comments Section */}
                <section id="comments">
                    <CommentsSection comments={[
                        {
                            id: '1',
                            author: 'Jane Smith',
                            content: 'Great article! I learned a lot about supporting black-owned businesses.',
                            date: 'June 1, 2023',
                            avatarUrl: '/images/sbblogo.png'
                        },
                        {
                            id: '2',
                            author: 'Bob Johnson',
                            content: 'I appreciate the insights shared in this article. Looking forward to more content like this.',
                            date: 'June 2, 2023',
                            avatarUrl: '/images/sbblogo.png'
                        }
                    ]} />
                </section>
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}
