import axios from 'axios';
import apiMapping from './api-flow-mapping.json';

const backendType = process.env.REACT_APP_BACKEND_TYPE || process.env.BACKEND_TYPE || 'nodejs';
const nodejsBaseUrl = process.env.REACT_APP_NODEJS_BASE_URL || process.env.NODEJS_BASE_URL || 'http://localhost:5000/api/todos/';
const activepiecesBaseUrl = process.env.REACT_APP_ACTIVEPIECES_BASE_URL || process.env.ACTIVEPIECES_BASE_URL || '';

const api = axios.create({
    baseURL: nodejsBaseUrl,
});

const executeApiCall = async (action, method, endpoint, data = null) => {
    if (backendType === 'activepieces') {
        const flowId = apiMapping[action];
        if (!flowId) {
            throw new Error(`Flow ID not found for action: ${action}`);
        }
        const baseUrl = activepiecesBaseUrl.endsWith('/') ? activepiecesBaseUrl : `${activepiecesBaseUrl}/`;
        let url = `${baseUrl}${flowId}/sync`;
        
        // Activepieces flows for update/delete often expect the ID in the query params
        if (data && data.id) {
            url += `?id=${data.id}`;
        }
        
        // Flatten data so fields like title/description appear directly in trigger.body
        return axios.post(url, { method, endpoint, ...data });
    } else {
        return api({ method, url: endpoint, data });
    }
};

export const getTodos = () => executeApiCall('getTodos', 'GET', '/');
export const createTodo = (todo) => executeApiCall('createTodo', 'POST', '/', todo);
export const updateTodo = (id, todo) => executeApiCall('updateTodo', 'PUT', `/${id}`, { id, ...todo });
export const deleteTodo = (id) => executeApiCall('deleteTodo', 'DELETE', `/${id}`, { id });

export default api;