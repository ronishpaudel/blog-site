import React from "react";
import { Content } from "./Content";
import Card from "./Card";
import Ad from "./Ad";
import { useRouter } from "next/router";

const Main = () => {
  const CARD_DATA: Array<{
    id: string;
    image?: string;
    category: string;
    title: string;
    authorName: string;
    profilePic: string;
    createdAt: string;
  }> = [
    {
      id: String(Math.random() * Math.random()),
      category: "Technology",
      authorName: "John Doe",
      createdAt: "2023-07-20T12:34:56Z",
      profilePic: "https://example.com/profiles/johndoe.jpg",
      title: "Introduction to Artificial Intelligence",
      image: "https://example.com/images/ai.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Food",
      authorName: "Jane Smith",
      createdAt: "2023-07-19T08:15:42Z",
      profilePic: "https://example.com/profiles/janesmith.jpg",
      title: "Delicious Recipes from Around the World",
      image: "https://example.com/images/recipes.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Travel",
      authorName: "Michael Johnson",
      createdAt: "2023-07-18T15:20:30Z",
      profilePic: "https://example.com/profiles/michaeljohnson.jpg",
      title: "Exploring Exotic Destinations",
      image: "https://example.com/images/travel.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Health",
      authorName: "Emily Wilson",
      createdAt: "2023-07-17T09:45:10Z",
      profilePic: "https://example.com/profiles/emilywilson.jpg",
      title: "Tips for a Healthy Lifestyle",
      image: "https://example.com/images/health.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Sports",
      authorName: "David Brown",
      createdAt: "2023-07-16T11:05:25Z",
      profilePic: "https://example.com/profiles/davidbrown.jpg",
      title: "The Thrill of Extreme Sports",
      image: "https://example.com/images/sports.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Fashion",
      authorName: "Sophia Lee",
      createdAt: "2023-07-15T14:55:33Z",
      profilePic: "https://example.com/profiles/sophialee.jpg",
      title: "Trending Fashion Styles",
      image: "https://example.com/images/fashion.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Science",
      authorName: "Robert Green",
      createdAt: "2023-07-14T17:30:12Z",
      profilePic: "https://example.com/profiles/robertgreen.jpg",
      title: "Latest Discoveries in Science",
      image: "https://example.com/images/science.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Music",
      authorName: "Jennifer Adams",
      createdAt: "2023-07-13T22:10:48Z",
      profilePic: "https://example.com/profiles/jenniferadams.jpg",
      title: "Melodies from the Heart",
      image: "https://example.com/images/music.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Nature",
      authorName: "William Turner",
      createdAt: "2023-07-12T16:25:59Z",
      profilePic: "https://example.com/profiles/williamturner.jpg",
      title: "Capturing the Beauty of Nature",
      image: "https://example.com/images/nature.jpg",
    },
    {
      id: String(Math.random() * Math.random()),
      category: "Books",
      authorName: "Lily Parker",
      createdAt: "2023-07-11T09:55:38Z",
      profilePic: "https://example.com/profiles/lilyparker.jpg",
      title: "Must-Read Books of the Year",
      image: "https://example.com/images/books.jpg",
    },
  ];
  const { push } = useRouter();
  return (
    <>
      <main>
        <div className="main">
          <div className="image-wrappper">
            <img src="/Image.png" className="Image" />
          </div>
          <Content />
          <Ad />
          <div className="card-parent">
            {CARD_DATA.map((a) => (
              <Card
                key={a.id}
                category={a.category}
                authorName={a.authorName}
                createdAt={a.createdAt}
                profilePic={a.profilePic}
                title={a.title}
                image={a.image}
                onCardClick={() => {
                  push({
                    pathname: "/[id]",
                    query: {
                      id: a.id,
                    },
                  });
                }}
                onProfileClick={() =>
                  console.log("navigate to profile with id")
                }
              />
            ))}
          </div>
          <div className="viewPost"> View All Post</div>
          <Ad />
        </div>
      </main>
    </>
  );
};

export { Main };
