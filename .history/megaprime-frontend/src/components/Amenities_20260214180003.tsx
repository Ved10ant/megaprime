import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

interface Amenity {
  name: string;
  description: string;
}

interface AmenitiesContent {
  title: string;
  amenities: Amenity[];
}

const Amenities: React.FC = () => {
  const [content, setContent] = useState<AmenitiesContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await contentService.getContent('amenities');
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching amenities content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="py-16 bg-gray-50 animate-pulse"></div>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {content?.title || 'World-Class Amenities'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content?.amenities?.map((amenity, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{amenity.name}</h3>
              <p className="text-gray-600">{amenity.description}</p>
            </div>
          )) || (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Swimming Pool</h3>
                <p className="text-gray-600">Olympic-size swimming pool for residents</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Gymnasium</h3>
                <p className="text-gray-600">Fully equipped modern fitness center</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Club House</h3>
                <p className="text-gray-600">Premium club house with recreational facilities</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Amenities;