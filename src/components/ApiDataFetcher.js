import React, { useState, useEffect } from 'react';
import { Page, Layout, Card, TextContainer } from '@shopify/polaris';
import ReactLoading from 'react-loading';

const ApiDataFetcher = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your Laravel API
                const apiUrl = 'http://localhost:8000/api/get-messages';  // Adjust the API endpoint

                // Fetch the access token from a secure location or use your authentication flow
                const accessToken = 'YOUR_ACCESS_TOKEN';

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // ...

    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Card>
                        <TextContainer>
                            <h2>Data from API:</h2>
                            {data ? (
                                // Your data rendering logic here...
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                    {data.messages.map((message, index) => (
                                        <Card key={index} sectioned style={{ margin: '16px' }}>
                                            <TextContainer>
                                                <p>Name: {message.name}</p>
                                                <p>Subject: {message.subject}</p>
                                                <p>Message: {message.message}</p>
                                            </TextContainer>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                // Loading animation using React Loading
                                <ReactLoading type={'spin'} color={'#0084ff'} height={50} width={50} />
                            )}
                            {error && <p>Error: {error}</p>}
                        </TextContainer>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
// ...

};

export default ApiDataFetcher;
