import React from "react";
import { Typography, Card } from "antd";

const { Title, Paragraph } = Typography;

export default function About() {
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Title>Space! News</Title>
            <Card>
                <Paragraph>
                    Space! News is a simple way to stay on top of what’s happening in space. We pull the newest articles from trusted space news sites around the web, so you don’t have to hunt them down yourself. Whether you’ve been into space forever or you’re just starting to care, there’s always something cool to read.
                </Paragraph>
            </Card>
        </div>
    );
}
