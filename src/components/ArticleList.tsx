import React from "react";
import { Row, Col, Skeleton } from "antd";
import { Article } from "@/types/types";
import ArticleCard from "./ArticleCard";

interface ArticleListProps {
    articles: Article[];
    loading: boolean;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, loading }) => {
    if (loading) {
        return (
            <Row gutter={[16, 16]}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={i}>
                        <Skeleton.Image active style={{ width: "100%", height: "200px" }} />
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </Col>
                ))}
            </Row>
        );
    }

    return (
        <Row gutter={[16, 16]}>
            {articles.map((article) => (
                <Col xs={24} sm={12} md={8} lg={6} key={article.id}>
                    <ArticleCard article={article} />
                </Col>
            ))}
        </Row>
    );
};

export default ArticleList;

// You'll need to replace undefined with the correct type
/**
 * This component renders a list of articles. It takes as input an array of articles and a boolean indicating whether the list is loading.
 * You will need to write a props interface for this component.
 *
 * You should use your custom ArticleCard component to build this.
 * No data manipulation is needed here.
 * Don't forget to add a unique key prop to each ArticleCard.
 * Don't forget to add a Skeleton component for when the list is loading. You might need conditional render logic for this
 *
 */
