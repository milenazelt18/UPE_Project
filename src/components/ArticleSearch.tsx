import React, { useState } from "react";
import { Input, Card, List, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Article, ArticleResponse } from "@/types/types";

const { Search } = Input;
const { Text } = Typography;

const ArticleSearch: React.FC = () => {
    const [searchResults, setSearchResults] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (value: string) => {
        if (!value.trim()) return;

        setLoading(true);
        setSearched(true);
        try {
            const response = await fetch(
                `https://api.spaceflightnewsapi.net/v4/articles/?search=${encodeURIComponent(
                    value
                )}&ordering=-published_at`
            );
            const data: ArticleResponse = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error("Error searching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <Card title="Search Articles" style={{ marginBottom: "24px" }}>
            <Search
                placeholder="Search for space news..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                loading={loading}
            />

            {searched && (
                <div style={{ marginTop: "24px" }}>
                    <Text strong>Found {searchResults.length} results</Text>
                    <List
                        style={{ marginTop: "16px" }}
                        dataSource={searchResults}
                        renderItem={(article) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {article.title}
                                        </a>
                                    }
                                    description={
                                        <>
                                            <p>{article.summary}</p>
                                            <Space>
                                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                                    {article.news_site}
                                                </Text>
                                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                                    {formatDate(article.published_at)}
                                                </Text>
                                            </Space>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </Card>
    );
};

export default ArticleSearch;