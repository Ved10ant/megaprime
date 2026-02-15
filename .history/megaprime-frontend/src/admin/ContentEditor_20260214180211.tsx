import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

interface ContentData {
    title: string;
    content: any;
}

interface ContentEditorProps {
    sectionId: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ sectionId }) => {
    const [content, setContent] = useState<ContentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchContent();
    }, [sectionId]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await contentService.getContent(sectionId);
            setContent(response.data);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!content) return;

        try {
            setSaving(true);
            setSuccess(false);
            await contentService.updateContent(sectionId, content);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving content:', error);
        } finally {
            setSaving(false);
        }
    };

    const updateContentField = (field: string, value: any) => {
        if (!content) return;

        setContent({
            ...content,
            content: {
                ...content.content,
                [field]: value
            }
        });
    };

    const updateNestedField = (field: string, index: number, subField: string, value: any) => {
        if (!content) return;

        const updatedArray = [...content.content[field]];
        updatedArray[index] = {
            ...updatedArray[index],
            [subField]: value
        };

        setContent({
            ...content,
            content: {
                ...content.content,
                [field]: updatedArray
            }
        });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!content) return null;

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">{content.title}</h2>
                <p className="text-gray-600 mt-1">Edit the content for this section</p>
            </div>

            <div className="p-6">
                {/* Title Field */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                    </label>
                    <input
                        type="text"
                        value={content.content.title || ''}
                        onChange={(e) => updateContentField('title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Dynamic Content Fields */}
                {sectionId === 'hero' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Heading
                            </label>
                            <input
                                type="text"
                                value={content.content.heading || ''}
                                onChange={(e) => updateContentField('heading', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subheading
                            </label>
                            <input
                                type="text"
                                value={content.content.subheading || ''}
                                onChange={(e) => updateContentField('subheading', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={content.content.description || ''}
                                onChange={(e) => updateContentField('description', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                )}

                {sectionId === 'project-overview' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={content.content.description || ''}
                            onChange={(e) => updateContentField('description', e.target.value)}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}

                {sectionId === 'nearby-connectivity' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Locations
                        </label>
                        <div className="space-y-2">
                            {content.content.locations?.map((location: string, index: number) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={location}
                                    onChange={(e) => {
                                        const updatedLocations = [...content.content.locations];
                                        updatedLocations[index] = e.target.value;
                                        updateContentField('locations', updatedLocations);
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {sectionId === 'amenities' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amenities
                        </label>
                        <div className="space-y-4">
                            {content.content.amenities?.map((amenity: any, index: number) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Name</label>
                                            <input
                                                type="text"
                                                value={amenity.name}
                                                onChange={(e) => updateNestedField('amenities', index, 'name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Description</label>
                                            <input
                                                type="text"
                                                value={amenity.description}
                                                onChange={(e) => updateNestedField('amenities', index, 'description', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {sectionId === 'about-us' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={content.content.description || ''}
                            onChange={(e) => updateContentField('description', e.target.value)}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}

                {sectionId === 'construction-updates' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Construction Phases
                        </label>
                        <div className="space-y-3">
                            {content.content.phases?.map((phase: any, index: number) => (
                                <div key={index} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={phase.name}
                                        onChange={(e) => updateNestedField('phases', index, 'name', e.target.value)}
                                        placeholder="Phase name"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <select
                                        value={phase.status}
                                        onChange={(e) => updateNestedField('phases', index, 'status', e.target.value)}
                                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {sectionId === 'faq' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Questions & Answers
                        </label>
                        <div className="space-y-4">
                            {content.content.questions?.map((faq: any, index: number) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Question</label>
                                            <input
                                                type="text"
                                                value={faq.question}
                                                onChange={(e) => updateNestedField('questions', index, 'question', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Answer</label>
                                            <textarea
                                                value={faq.answer}
                                                onChange={(e) => updateNestedField('questions', index, 'answer', e.target.value)}
                                                rows={2}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>

                        {success && (
                            <div className="text-green-600 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Changes saved successfully!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentEditor;