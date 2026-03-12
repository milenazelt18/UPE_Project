import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { Article } from "@/types/types";

const { Title, Text } = Typography;

interface ArticleStatisticsProps {
    articles: Article[];
}

const ArticleStatistics: React.FC<ArticleStatisticsProps> = ({ articles }) => {
    // Get unique news sources
    const uniqueNewsSources = Array.from(
        new Set(articles.map((article) => article.news_site))
    ).sort();

    // Get date range
    const dates = articles.map((article) => new Date(article.published_at));
    const earliestDate = dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : null;
    const latestDate = dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : null;

    // Format date helper
    const formatDate = (date: Date | null) => {
        if (!date) return "N/A";
        return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
    };

    // Count featured articles
    const featuredCount = articles.filter((article) => article.featured).length;

    return (
        <div style={{ marginBottom: "24px" }}>
            <Row gutter={[16, 16]}>
                {/* Card 1: Unique News Sources */}
                <Col xs={24} sm={8}>
                    <Card>
                        <Title level={5} style={{ marginTop: 0, marginBottom: "16px" }}>
                            Unique News Sources
                        </Title>
                        {uniqueNewsSources.length > 0 ? (
                            <div>
                                {uniqueNewsSources.map((source, index) => (
                                    <Text key={index} style={{ display: "block", marginBottom: "8px" }}>
                                        {source}
                                    </Text>
                                ))}
                            </div>
                        ) : (
                            <Text type="secondary">No sources available</Text>
                        )}
                    </Card>
                </Col>

                {/* Card 2: Date Range of Articles */}
                <Col xs={24} sm={8}>
                    <Card>
                        <Title level={5} style={{ marginTop: 0, marginBottom: "16px" }}>
                            Date Range of Articles
                        </Title>
                        <div>
                            <Text style={{ display: "block", marginBottom: "8px" }}>
                                Earliest: {formatDate(earliestDate)}
                            </Text>
                            <Text style={{ display: "block", marginBottom: "8px" }}>
                                Latest: {formatDate(latestDate)}
                            </Text>
                        </div>
                    </Card>
                </Col>

                {/* Card 3: Number of Featured Articles */}
                <Col xs={24} sm={8}>
                    <Card>
                        <Title level={5} style={{ marginTop: 0, marginBottom: "16px" }}>
                            Number of Featured Articles
                        </Title>
                        <div>
                            <Text style={{ display: "block", marginBottom: "8px" }}>
                                Count: {featuredCount}
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ArticleStatistics;
/**
 * This component generates the following statistics:
 * 1. Unique news sources
 * 2. Date range of articles
 * 3. Number of featured articles
 *
 * It takes as input an array of articles
 *
 * You should use a combination of Antd components to buidld this.
 * You might need to do some data manipulation to get the data in the right format.
 *
 * I used a combination of the following components:
 * 1. List
 * 2. Row
 * 3. Col
 * 4. Typography.Text
 * 5. Typography.Title
 */