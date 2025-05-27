import axios from 'axios';
import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const timeStore = create((set)=>({
    recordingTime: false,

  
}))