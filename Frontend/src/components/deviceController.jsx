export default function DeviceController({ device }) {
   return (
      <div>
         <h2>Device Controller</h2>
         <div>
            <h3>{device.name}</h3>
            <p>Status: {device.status}</p>
            <button onClick={() => console.log(`Controlling ${device.name}`)}>Control Device</button>
         </div>
         <div>
            <h4>Device Details</h4>
            <p>Type: {device.type}</p>
            <p>Location: {device.location}</p>
         </div>
      </div>
   )
}
