const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

export const endpoints = {
    courses: {
        allCourses: `${API_BASE_URL}/course/courses`,
        getCourseById: `${API_BASE_URL}/course/courses/:courseId`,
        //   getCourseVideos: `${API_BASE_URL}/course/:id`,
    },
    videos: {
        videosByCourse: `${API_BASE_URL}/videos/videos/:courseId`,
        videoDetails: `${API_BASE_URL}/videos/:id`, // Example with dynamic parameter
        // Add more video endpoints as needed
    },
    // Add more endpoints for other components if needed
};
