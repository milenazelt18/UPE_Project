import React, { useState, useEffect } from "react";
import { Typography, Switch, Pagination, Space } from "antd";
import ArticleList from "@/components/ArticleList";
import ArticleTable from "@/components/ArticleTable";
import ArticleStatistics from "@/components/ArticleStatistics";
import { Article, ArticleResponse } from "@/types/types";

const { Title, Text } = Typography;

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTableView, setIsTableView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchArticles = async (page: number, size: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * size;
      const response = await fetch(
          `https://api.spaceflightnewsapi.net/v4/articles/?limit=${size}&offset=${offset}&ordering=-published_at`
      );
      const data: ArticleResponse = await response.json();
      setArticles(data.results);
      setTotalCount(data.count);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
      setCurrentPage(1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
      <div style={{ width: "100%" }}>
        {/* View Toggle */}
        <div style={{ marginBottom: "24px" }}>
          <Space align="center">
            <Text>View as:</Text>
            <Switch
                checked={isTableView}
                onChange={(checked) => setIsTableView(checked)}
                checkedChildren="Table"
                unCheckedChildren="Grid"
                style={{
                  backgroundColor: isTableView ? "#52c41a" : undefined
                }}
            />
            <span style={{ fontSize: "14px", color: "#595959" }}>
                        (Switch between Table and Grid view)
                    </span>
          </Space>
        </div>

        {/* Article Statistics */}
        {!loading && articles.length > 0 && (
            <>
              <Title level={3}>Article Statistics</Title>
              <ArticleStatistics articles={articles} />
            </>
        )}

        {/* Articles Title */}
        <Title level={3} style={{ marginTop: "32px", marginBottom: "16px" }}>
          Articles
        </Title>

        {/* Article List or Table */}
        {isTableView ? (
            <ArticleTable articles={articles} loading={loading} />
        ) : (
            <ArticleList articles={articles} loading={loading} />
        )}

        {/* Pagination */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCount}
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={["10", "20", "50", "100"]}
              showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} articles`
              }
          />
        </div>
      </div>
  );
};

export default NewsPage;

