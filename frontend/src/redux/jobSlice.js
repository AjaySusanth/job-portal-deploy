import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJob:null,
        appliedJobs:[]
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs = action.payload
        },
        setSingleJob:(state,action) =>{
            state.singleJob = action.payload;
        },
        setSearchJob:(state,action)=>{
            state.searchJob = action.payload
        },
        setAppliedJobs:(state,action)=>{
            state.appliedJobs = action.payload
        }
    }
});

export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJob,setAppliedJobs} = jobSlice.actions
export default jobSlice.reducer