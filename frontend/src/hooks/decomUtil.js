import { useState, useEffect } from 'react';

// Utility function to get CSRF token
export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

// Custom hook for drag and drop functionality
export const useDragAndDrop = (onProgressUpdate) => {
    const [draggedTask, setDraggedTask] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [feedbackColor, setFeedbackColor] = useState('black');
    const [isNextChapterEnabled, setIsNextChapterEnabled] = useState(false);

    const handleDragStart = (e, task) => {
        setDraggedTask(task);
        e.target.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggedTask(null);
    };

    const handleDragOver = (e, containerId) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '#f0f0f0';
    };

    const handleDragLeave = (e) => {
        e.currentTarget.style.backgroundColor = '';
    };

    const handleDrop = (e, containerId) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '';
        if (draggedTask) {
            onProgressUpdate(draggedTask.id, containerId);
        }
    };

    return {
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        feedback,
        setFeedback,
        feedbackColor,
        setFeedbackColor,
        isNextChapterEnabled,
        setIsNextChapterEnabled
    };
};

// API functions
export const loadProgress = async (exerciseId) => {
    try {
        const response = await fetch('/api/get_progress/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: {"exerciseId": exerciseId}
        }
    );
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Failed to load progress');
    } catch (error) {
        console.error('Error loading progress:', error);
        return null;
    }
};

export const saveProgress = async (progressData) => {
    const csrftoken = getCookie('csrftoken');
    console.log(progressData);
    try {
        const response = await fetch('/api/save_progress/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(progressData)
        });
        return response.ok;
    } catch (error) {
        console.error('Error saving progress:', error);
        return false;
    }
};

// Validation function
export const checkCategories = (items) => {
    return items.every(item => 
        item.category !== 'main-recipe' && 
        item.category === item.dataCategory
    );
};