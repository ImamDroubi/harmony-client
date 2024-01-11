import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"

export const getUserResources = async ({queryKey})=>{
  const type = queryKey[0];
  const userId = queryKey[1]; 
  return await axios.get(`/${type}/user/${userId}`);
}

export const getSpecificTracks = async(mixingTracks)=>{
  let query = "";
  mixingTracks.forEach(track=>{
    query+= `tracksIds[]=${track.id}&`; 
  })
  try{
    return axios.get(`/tracks/multiple?${query}`);
  }catch(err){
    throw new Error(err);
  }
}

