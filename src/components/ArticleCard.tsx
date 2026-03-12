import React, { useState } from "react";
import { Card, Typography } from "antd";
import { Article } from "@/types/types";
import image404 from "../assets/404.png";

const { Meta } = Card;
const { Text } = Typography;

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const [imgSrc, setImgSrc] = useState(article.image_url);

    const handleImageError = () => {
        setImgSrc(image404.src);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleCardClick = () => {
        window.open(article.url, "_blank", "noopener,noreferrer");
    };

    return (
        <Card
            hoverable
            cover={
                <img
                    alt={article.title}
                    src={imgSrc}
                    onError={handleImageError}
                    style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
            }
            onClick={handleCardClick}
            style={{ height: "100%", cursor: "pointer" }}
        >
            <Meta
                title={
                    <div style={{ marginBottom: "8px" }}>
                        {article.title}
                    </div>
                }
                description={
                    <div>
                        <Text style={{ fontSize: "14px", display: "block", marginBottom: "12px" }}>
                            {article.summary}
                        </Text>
                        <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
                            {article.news_site}
                        </Text>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                            {formatDate(article.published_at)}
                        </Text>
                    </div>
                }
            />
        </Card>
    );
};

export default ArticleCard;
