import { useEffect, useState } from "react";
import Prayer from "./component/Prayer"

function App() {
const [prayerTimes,setPrayerTimes]=useState({});
const [dateTime,setDateTime]=useState("");
const [city,setCity]=useState("Cairo");
  const cities=[
  {name:'القاهرة',value:"Cario"},
  {name:'عمان',value:"Amman"},
  {name:'دمشق',value:"Damascus"},
  {name:'القدس',value:"Alquds"},
  {name:'بيروت',value:"Beirut "},
  {name:'بغداد',value:"Baghdad"},
  {name:'قطر',value:"Qatar"}
  





];

useEffect(()=>{
  const fetchPrayerTimes=async ()=>{
    try{
      const response=await fetch(`http://api.aladhan.com/v1/timingsByCity/28-12-2024?city=Eg&country=${city}`);
      const data_Prayer =  await response.json();
      setPrayerTimes(data_Prayer.data.timings);
      setDateTime(data_Prayer.data.date.gregorian.date)


      console.log(data_Prayer);
    }

    catch(error){
  console.error(error)

    }
  }
  fetchPrayerTimes();
},[city])


const formatTimes=(time)=>{
  if(!time){
    return "00:00";
  }
  let [hours,minutes]=time.split(":").map(Number)
  const perd=hours>=12?"PM":"AM";
  hours=hours % 12|| 12;
  return `${hours}:${minutes <10 ?"0"+minutes:minutes}  ${perd}`;
}
  return (
    <section>
    <div className="container">
    <div className="top-sec">
    <div className="city">   
     <h1>المدينة</h1>
    <select onChange={(e)=>setCity(e.target.value)}>
 {cities.map((city_Obj)=>(
  <option key={city_Obj.value} value={city_Obj.value}>{city_Obj.name}</option>
 )

 )}
    </select>
    </div>
    <div className="date">
    <h1>التاريخ</h1>
    <h4>{dateTime}</h4>
    </div>

    </div>
    <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)} />
    <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)} />

    <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)}  />

    <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)} />

    <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)} />

    
    
    
    </div>
   
    </section>
  )
}

export default App
