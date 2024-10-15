export const isAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    return !!token; // Returns true if token exists
};

export const isAdmin = () => {
    // Since we have only one admin, check if token exists
    return isAuthenticated();
};
