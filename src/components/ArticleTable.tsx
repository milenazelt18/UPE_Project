import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Article } from "@/types/types";

interface ArticleTableProps {
  articles: Article[];
  loading: boolean;
}

const ArticleTable: React.FC<ArticleTableProps> = ({ articles, loading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const columns: ColumnsType<Article> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Article) => (
          <a href={record.url} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
      ),
    },
    {
      title: "News Site",
      dataIndex: "news_site",
      key: "news_site",
      width: 200,
    },
    {
      title: "Published Date",
      dataIndex: "published_at",
      key: "published_at",
      width: 200,
      render: (date: string) => formatDate(date),
    },
  ];

  return (
      <Table
          columns={columns}
          dataSource={articles}
          rowKey="id"
          loading={loading}
          pagination={false}
      />
  );
};

export default ArticleTable;
/**
 * This component renders a table of articles. It takes as input an array of articles and a boolean indicating whether the table is loading.
 * You should use the Antd Table component to build this.
 * No data manipulation is needed here.
 * You will need to write a custom render function for the "published_at" column to format the date.
 *
 */