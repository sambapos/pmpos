# PMPOS
Reactjs based WebPOS Project for SambaPOS

#Installation
- Install NodeJS (https://nodejs.org/)
- Install Git and choose Use Git from the Windows Command Prompt option: (https://git-scm.com)
- run `git clone https://github.com/sambapos/pmpos.git` command to download project. 
- run `npm install` command under project folder to install libraries.
- `npm run start` will start dev server on 8080 port.
- `npm run build` will build for production. 

#Configuration
- Edit app > queries.js and set `serverUrl`, `menuName`, `departmentName`, `userName`, `tickettypeName`, and `terminalName` constants to setup GraphQL server.
- Edit app > signalr.js and set `serverUrl` constant to setup SignalR Server.
