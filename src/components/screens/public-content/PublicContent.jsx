import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faUpload} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import "./public-content.scss";
import Combination from '../../cards/combination/Combination';
import CustomSelect from '../../menus/custom-select/CustomSelect';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import ocean from "../../../assets/images/ocean.jpg";
import birds from "../../../assets/images/birds.jpg";
import sleep from "../../../assets/images/sleep.jpg";
import study from "../../../assets/images/study.jpg";
import campfire from "../../../assets/images/campfire.jpg";
import waterfall from "../../../assets/images/waterfall.jpg";
import thunder from "../../../assets/images/thunder.jpg";
import rain from "../../../assets/images/rain.jpg";
import ocean_s from "../../../assets/sounds/ocean.mp3";
import birds_s from "../../../assets/sounds/birds.mp3";
import campfire_s from "../../../assets/sounds/campfire.mp3";
import waterfall_s from "../../../assets/sounds/waterfall.mp3";
import thunder_s from "../../../assets/sounds/thunder.mp3";
import rain_s from "../../../assets/sounds/rain.mp3";
import Toggle from '../../other/toggle/Toggle';
import Track from '../../cards/track/Track';
import { useParams, useSearchParams } from 'react-router-dom';
export default function UserPublic() {
  const {category: currentCategory} = useParams();
  const [currentResource,setCurrentResource] = useState(false); // false for tracks, true for combinations
  const tracks = [
    {
      "id" : "abc1234",
      "title" : "Ocean",
      "sound" : ocean_s,
      "img" : ocean,
      "volume" : 50,
      "repeat" : true,
      "mute" : false,
      "category" : "Nature",
      "duration" : "00:04:23",
      "is_public" : true
    },
    {
      "id" : "abc1235",
      "title" : "Birds",
      "sound" : birds_s,
      "img" : birds,
      "volume" : 50,
      "repeat" : true,
      "mute" : false,
      "category" : "Animals",
      "duration" : "00:00:23",
      "is_public" : true
    },
    {
      "id" : "abc1237",
      "title" : "Thunder",
      "sound" : thunder_s,
      "img" : thunder,
      "volume" : 10,
      "repeat" : true,
      "mute" : false,
      "category" : "Nature",
      "duration" : "12:00:01",
      "is_public" : false
    },
    {
      "id" : "abc1236",
      "title" : "Campfire",
      "sound" : campfire_s,
      "img" : campfire,
      "volume" : 100,
      "category" : "Night",
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1238",
      "title" : "Waterfall",
      "sound" : waterfall_s,
      "img" : waterfall,
      "volume" : 50,
      "category" : "Nature",
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1239",
      "title" : "Rain",
      "sound" : rain_s,
      "img" : rain,
      "volume" : 10,
      "category" : "Nature",
      "repeat" : true,
      "mute" : false
    }
  ]
  const combinations = [
    {
      "id" : "comb1",
      "owner_id" : "user1",
      "name" : "Bed Time",
      "photo" : sleep,
      "description" : "Combination for bed time ",
      "like_count" : 0,
      "is_public" : false,
      "category" : "sleep",
      'tracks': [
        {
          "id" : "abc1234",
          "title" : "Ocean",
          "sound" : ocean_s,
          "img" : ocean,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1235",
          "title" : "Birds",
          "sound" : birds_s,
          "img" : birds,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1237",
          "title" : "Thunder",
          "sound" : thunder_s,
          "img" : thunder,
          "volume" : 10,
          "repeat" : true,
          "mute" : false
        }
      ]
      
    },
    {
      "id" : "comb1",
      "owner_id" : "user1",
      "name" : "Bed Time",
      "photo" : sleep,
      "description" : "Combination for bed time ",
      "like_count" : 0,
      "is_public" : false,
      "category" : "sleep",
      'tracks': [
        {
          "id" : "abc1234",
          "title" : "Ocean",
          "sound" : ocean_s,
          "img" : ocean,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1235",
          "title" : "Birds",
          "sound" : birds_s,
          "img" : birds,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1237",
          "title" : "Thunder",
          "sound" : thunder_s,
          "img" : thunder,
          "volume" : 10,
          "repeat" : true,
          "mute" : false
        }
      ]
      
    },
    {
      "id" : "comb1",
      "owner_id" : "user1",
      "name" : "Bed Time",
      "photo" : sleep,
      "description" : "Combination for bed time ",
      "like_count" : 0,
      "is_public" : false,
      "category" : "sleep",
      'tracks': [
        {
          "id" : "abc1234",
          "title" : "Ocean",
          "sound" : ocean_s,
          "img" : ocean,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1235",
          "title" : "Birds",
          "sound" : birds_s,
          "img" : birds,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1237",
          "title" : "Thunder",
          "sound" : thunder_s,
          "img" : thunder,
          "volume" : 10,
          "repeat" : true,
          "mute" : false
        }
      ]
      
    },
    {
      "id" : "comb1",
      "owner_id" : "user1",
      "name" : "Bed Time",
      "photo" : sleep,
      "description" : "Combination for bed time ",
      "like_count" : 0,
      "is_public" : false,
      "category" : "sleep",
      'tracks': [
        {
          "id" : "abc1234",
          "title" : "Ocean",
          "sound" : ocean_s,
          "img" : ocean,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1235",
          "title" : "Birds",
          "sound" : birds_s,
          "img" : birds,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1237",
          "title" : "Thunder",
          "sound" : thunder_s,
          "img" : thunder,
          "volume" : 10,
          "repeat" : true,
          "mute" : false
        }
      ]
      
    },
    {
      "id" : "comb1",
      "owner_id" : "user1",
      "name" : "Bed Time",
      "photo" : sleep,
      "description" : "Combination for bed time ",
      "like_count" : 0,
      "is_public" : false,
      "category" : "sleep",
      'tracks': [
        {
          "id" : "abc1234",
          "title" : "Ocean",
          "sound" : ocean_s,
          "img" : ocean,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1235",
          "title" : "Birds",
          "sound" : birds_s,
          "img" : birds,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1237",
          "title" : "Thunder",
          "sound" : thunder_s,
          "img" : thunder,
          "volume" : 10,
          "repeat" : true,
          "mute" : false
        }
      ]
      
    },
    {
      "id" : "comb1",
      "owner_id" : "user1",
      "name" : "Bed Time",
      "photo" : sleep,
      "description" : "Combination for bed time ",
      "like_count" : 0,
      "is_public" : false,
      "category" : "sleep",
      'tracks': [
        {
          "id" : "abc1234",
          "title" : "Ocean",
          "sound" : ocean_s,
          "img" : ocean,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1235",
          "title" : "Birds",
          "sound" : birds_s,
          "img" : birds,
          "volume" : 50,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1237",
          "title" : "Thunder",
          "sound" : thunder_s,
          "img" : thunder,
          "volume" : 10,
          "repeat" : true,
          "mute" : false
        }
      ]
      
    },
    {
      "id" : "comb2",
      "owner_id" : "user1",
      "name" : "Study Time",
      "photo" : study,
      "description" : "Combination for studying my math exam for the college and bla bla bla ",
      "like_count" : 2,
      "is_public" : true,
      "category" : "study",
      'tracks': [
        {
          "id" : "abc1236",
          "title" : "Campfire",
          "sound" : campfire_s,
          "img" : campfire,
          "volume" : 100,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1238",
          "title" : "Waterfall",
          "sound" : waterfall_s,
          "img" : waterfall,
          "volume" : 0,
          "repeat" : true,
          "mute" : false
        },
        {
          "id" : "abc1239",
          "title" : "Rain",
          "sound" : rain_s,
          "img" : rain,
          "volume" : 0,
          "repeat" : true,
          "mute" : false
        }
      ]
      
    }
  ]
  return (
    <div className='public-content'>
    <ContainerWide>
      <header>
        <div className="top">
          <h2>{currentCategory}</h2>
          <div className="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" />
          </div>
        </div>
        <div className="description">
          <p>Public tracks & combinations for this category.</p>
        </div>
        <div className="filter">
          <div className="switch">
            <Toggle toggleAction={setCurrentResource}/>
            <p>{currentResource?"Combinations":"Tracks"}</p>
          </div>
        </div>
      </header>
      {currentResource&&<div className="combinations">
        {combinations.map(comb=>{
          return !currentCategory || currentCategory === "All" || comb.category === currentCategory?
          <Combination combination={comb}/>
          :null
        })}
      </div>}
      {!currentResource&&<div className="tracks">
        {tracks.map((track,ind)=>{
          return (!currentCategory || currentCategory === "All" || currentCategory === track.category)
          ?<Track track={track} key={track.id} number = {ind+1} /> 
          :null;
        })}
      </div>}
    </ContainerWide>
  </div>
  )
}
