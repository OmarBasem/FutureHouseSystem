// In this file you need to write all the other actions not related to authentication. Creating houses, adding houses, creating rooms,
// adding IooT devices, fetching reports, etc ...

// Below are the api end points you need
// All the request needs the Authentication token. Check auth.js to see how to get the Auth Token.

// Houses:
// 1. To create a house:
// type: POST
// endpoint: /api/houses/
// body: {cmu_id: 'abc123', name: 'House A'}
// optionally the body can have location and cover_photo_id.

// 2. To delete a house:
// type: DELETE
// endpoint: /api/houses/${house_id}/  e.g.: /api/houses/23/

// 3. To update a house:
// type: UPDATE
// endpoint: /api/houses/${house_id}/ e.g: /api/houses/27/
// body: {name: 'name', location: 'location'}
// optionally the body can have a cover_photo_id

// 4. Fetch all the user's houses
// type: GET
// endpoint: /api/houses/

// 5. Assign a user as a dweller
// type: POST
// endpoint: /api/assign-dweller/
// body: {house_id: '123'}



// Rooms:
// 1. To create a room:
// type: POST
// endpoint: /api/rooms/
// body: {house_id: '123', name: 'Room A'}
// optionally the body can have a cover_photo_id.

// 2. To delete a room:
// type: DELETE
// endpoint: /api/rooms/${room_id}/

// 3. To update a room:
// type: UPDATE
// endpoint: /api/rooms/${room_id}/
// body: {name: 'name'}
// optionally the body can have a cover_photo_id

// 4. Fetch all the rooms of a house
// type: GET
// endpoint: /api/rooms/?q=${house_id}  e.g.: /api/rooms/?q=12


// IoT Devices:
// 1. To create a device entry:
// type: POST
// endpoint: /api/iot-devices/
// body: {house_id: '123', name: 'Device A'}
// optionally the body can have a cover_photo_id.

// 2. To delete a device:
// type: DELETE
// endpoint: /api/iot-devices/${device_id}/

// 3. To update a device:
// type: UPDATE
// endpoint: /api/rooms/${device_id}/
// body: {name: 'name'}
// optionally the body can have a cover_photo_id

// 4. Fetch all the devices of a house
// type: GET
// endpoint: /api/iot-devices/?q=${house_id}  e.g.: /api/iot-devices/?q=12

// Cover Photo
// 1. To create a cover photo:
// type: POST
// endpoint: /api/cover-photos/
// body: {uri: FILE}

// Reports
// 1. To fetch the last 24hr data
// type: GET
// endpoint: /api/last-24hr/?q=${house_id}

// 2. Fetch all the reports of a house or a room
// type: GET
// endpoint: /api/reports/?q=${id},type=${type}   e.g.: /api/reports/?q=12,type=house
// type above can be house or room, and the ${id} is the house id or the room id



// Support
// 1. Report a problem
// type: POST
// endpoint: /api/support-message/
// body: {text: 'text', problem: true}

// 2. Send Feedback
// type: POST
// endpoint: /api/support-message/
// body: {text: 'text', problem: false}

// 3. Ask a question
// type: POST
// endpoint: /api/ask-question/
// body: {text: 'text'}

// There are still more endpoints that needs to be added, but let's get these done first!


