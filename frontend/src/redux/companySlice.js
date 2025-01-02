import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:'company',
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompany:null
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload
        },
        setCompanies:(state,action)=>{
            state.companies = action.payload
        },
        setSearchCompany:(state,action) =>{
            state.searchCompany = action.payload
        }
    }
})

export const {setSingleCompany,setCompanies,setSearchCompany} = companySlice.actions
export default companySlice.reducer