import React, { useState, useEffect } from "react";
import { Typography, Card } from "antd";
import { useRouter } from "next/router";
import { Article, ArticleResponse } from "@/types/types";
import ArticleCard from "@/components/ArticleCard";

const { Title, Paragraph } = Typography;

export default function Home() {
    const [latestArticle, setLatestArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchLatestArticle = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "https://api.spaceflightnewsapi.net/v4/articles/?limit=1&ordering=-published_at"
                );
                const data: ArticleResponse = await response.json();
                if (data.results.length > 0) {
                    setLatestArticle(data.results[0]);
                }
            } catch (error) {
                console.error("Error fetching latest article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestArticle();
    }, []);

    const handleSeeAllArticles = () => {
        router.push("/news");
    };

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Title level={1}>Space! News</Title>
            <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>
                Keep up with the latest space news without digging for it. Rocket launches, new discoveries, weird space stuff, all in one place.
            </Paragraph>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px"
            }}>
                <Title level={2} style={{ margin: 0 }}>Latest Article</Title>
                <a
                    onClick={handleSeeAllArticles}
                    style={{
                        fontSize: "14px",
                        cursor: "pointer",
                        color: "#1890ff"
                    }}
                >
                    See all articles
                </a>
            </div>

            {!loading && latestArticle && (
                <div style={{ maxWidth: "400px" }}>
                    <ArticleCard article={latestArticle} />
                </div>
            )}
        </div>
    );
}