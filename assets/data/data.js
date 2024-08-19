const arrayGrupos = [
    {
        id: 1,
        nombre: "Motorización"
    },
    {
        id: 2,
        nombre: "Equipamiento de video"
    }
];

const arrayCategorias = [
    {
        id:1,
        idGrupo: 1,
        tag:"motores",
        nombre:"Motores Brushless",
        image:{
            url:"./assets/img/categoria/motores.jpg",
            alt:"",
        },        
    },
    {
        id:2,
        idGrupo: 1,
        tag:"esc",
        nombre:"ESC",
        image:{
            url:"./assets/img/categoria/esc.jpg",
            alt:"",
        },        
    },
    {
        id:3,
        idGrupo: 1,
        tag:"propellers",
        nombre:"Propellers",
        image:{
            url:"./assets/img/categoria/propellers.jpg",
            alt:"",
        },        
    },
    {
        id:4,
        idGrupo: 1,
        tag:"fc",
        nombre:"Flight Controllers",
        image:{
            url:"./assets/img/categoria/fc.jpg",
            alt:"",
        },        
    },    
    {
        id:5,
        idGrupo: 2,
        tag:"goggles",
        nombre:"Gafas",
        image:{
            url:"./assets/img/categoria/goggles.jpg",
            alt:"",
        },        
    },
    {
        id:6,
        idGrupo: 2,
        tag:"vtx",
        nombre:"Transmisores de video",
        image:{
            url:"./assets/img/categoria/vtx.jpg",
            alt:"",
        },        
    },
    {
        id:7,
        idGrupo: 2,
        tag:"camera",
        nombre:"Camaras",
        image:{
            url:"./assets/img/categoria/camera.jpg",
            alt:"",
        },        
    },
    {
        id:8,
        idGrupo: 2,
        tag:"antenna",
        nombre:"Antenas",
        image:{
            url:"./assets/img/categoria/antenna.jpg",
            alt:"",
        },        
    }
];

const arrayProductos = [
    {
        id:1,
        idCategoria:1,
        nombre:"TM F40pro",
        descripcion:"Fpv Racing Drone Motor.",
        image:{
            url:"../assets/img/motores/f40pro.jpg",
            alt:"imagen de un motor para avion a radio control",
        },
        precio:11.256
    },
    {
        id:2,
        idCategoria:1,
        nombre:"TM Its",
        descripcion:"Size 2208 2s to 4s",
        image:{
            url:"../assets/img/motores/its2208.jpg",
            alt:"imagen de un motor para avion a radio control",
        },        
        precio:21.159
    },
    {
        id:3,
        idCategoria:1,
        nombre:"TM Velox",
        descripcion:"Size 2207 3s to 4s",
        image:{
            url:"../assets/img/motores/v2207.jpg",
            alt:"imagen de un motor para avion a radio control",
        },                
        precio:31.741
    },
    {
        id:4,
        idCategoria:1,
        nombre:"TM V3120",
        descripcion:"Size 3120 4s to 6s",
        image:{
            url:"../assets/img/motores/v3120.jpg",
            alt:"imagen de un motor para avion a radio control",
        },        
        precio:41.852
    },
    {
        id:5,
        idCategoria:2,
        nombre:"F35A 3-6S",
        descripcion:"Fast Response, High Efficiency y Less Heat",
        image:{
            url:"../assets/img/esc/f35a.jpg",
            alt:"imagen de un motor para avion a radio control",
        },        
        precio:52
    },
    {
        id:6,
        idCategoria:2,
        nombre:"F55A PROII 6S 4IN1",
        descripcion:"Explosive Power, Fast Response y Prominent Reliability",
        image:{
            url:"../assets/img/esc/f55aproII.jpg",
            alt:"imagen de un motor para avion a radio control",
        },        
        precio:62
    },
    {
        id:7,
        idCategoria:2,
        nombre:"F66A MINI 6S 4IN1",
        descripcion:"High Current and High Voltage, all nfet.",
        image:{
            url:"../assets/img/esc/f66apro.jpg",
            alt:"imagen de un motor para avion a radio control",
        },        
        precio:72
    },
    {
        id:8,
        idCategoria:2,
        nombre:"MINI F45A 6S 4IN1",
        descripcion:"Mini Body, strong performance",
        image:{
            url:"../assets/img/esc/minif45a.jpg",
            alt:"imagen de un motor para avion a radio control",
        },        
        precio:82
    },
    {
        id:9,
        idCategoria:3,
        nombre:"5x5, 3 blade",
        descripcion:"GF-5127.5-Proxy-1",
        image:{
            url:"../assets/img/propellers/prop09.jpg",
            alt:"",
        },        
        precio:19.10
    },
    {
        id:10,
        idCategoria:3,
        nombre:"15x7 2 blade",
        descripcion:"HQ-15X7-Black",
        image:{
            url:"../assets/img/propellers/prop10.jpg",
            alt:"",
        },        
        precio:15.23
    },
    {
        id:11,
        idCategoria:3,
        nombre:"9x4 4 blade",
        descripcion:"HQ DT90MMX4 for Cinewhoop pink",
        image:{
            url:"../assets/img/propellers/prop11.jpg",
            alt:"",
        },        
        precio:82
    },
    {
        id:12,
        idCategoria:3,
        nombre:"2.9x5 5 blade",
        descripcion:"HQ DT2.9X2.5X5 for DJI Avata",
        image:{
            url:"../assets/img/propellers/prop12.jpg",
            alt:"",
        },        
        precio:82
    },
    {
        id:13,
        idCategoria:4,
        nombre:"H743 Slim V3",
        descripcion:"Mateksys Flight Controller H743 Slim V3",
        image:{
            url:"../assets/img/fc/fc13.jpg",
            alt:"",
        },        
        precio:96.99
    },
    {
        id:14,
        idCategoria:4,
        nombre:"STM32 H7",
        descripcion:"Kiss Ultra FCFC V2 Flight Controller",
        image:{
            url:"../assets/img/fc/fc14.jpg",
            alt:"",
        },        
        precio:98.31
    },
    {
        id:15,
        idCategoria:4,
        nombre:"STM32 F405RGT6",
        descripcion:"Mateksys Flight Controller F405-WTE",
        image:{
            url:"../assets/img/fc/fc15.jpg",
            alt:"",
        },        
        precio:75.45
    },
    {
        id:16,
        idCategoria:4,
        nombre:"AT32F435RMT7",
        descripcion:"TBS Lucid FC Pro",
        image:{
            url:"../assets/img/fc/fc16.jpg",
            alt:"",
        },        
        precio:49.95
    },
    {
        id:17,
        idCategoria:5,
        nombre:"Walksnail Avatar HD Goggles L",
        descripcion:"The Avatar HD system adopts industry-leading H.265 encoding technology",
        image:{
            url:"../assets/img/goggles/gog17.jpg",
            alt:"",
        },        
        precio:199
    },
    {
        id:18,
        idCategoria:5,
        nombre:"Skyzone SKY04X PRO Oled FPV",
        descripcion:"The SKY04X PRO is the upgrade version of SKY04X",
        image:{
            url:"../assets/img/goggles/gog18.jpg",
            alt:"",
        },        
        precio:499
    },
    {
        id:19,
        idCategoria:5,
        nombre:"Walksnail Avatar HD Goggles X",
        descripcion:"As the Walksnail Avatar born",
        image:{
            url:"../assets/img/goggles/gog19.jpg",
            alt:"",
        },        
        precio:459
    },
    {
        id:20,
        idCategoria:5,
        nombre:"SJ RHD430 FPV Goggles",
        descripcion:"SJ RHD430 5.8G 800*480 4.3inch 40CH Diversity DVR FPV Goggles",
        image:{
            url:"../assets/img/goggles/gog20.jpg",
            alt:"",
        },        
        precio:59.95
    },
    {
        id:21,
        idCategoria:6,
        nombre:"Walksnail Avatar HD GT Kit (2W)",
        descripcion:"Camera: Resolution: 1080P/60fps; 1080P/100fps; 720P/120fps; 720P/60fps, Transmitter Power (EIRP): FCC: <30dBm, MAX:33dBm ; CE: <14dBm; SRRC: <20dBm; MIC: <25dBm",
        image:{
            url:"../assets/img/vtx/vtx21.jpg",
            alt:"",
        },        
        precio:179
    },
    {
        id:22,
        idCategoria:6,
        nombre:"TBS Unify Pro32 DP (MMCX)",
        descripcion:"The TBS UNIFY PRO32 DP (MMCX), is a high-quality video transmitter",
        image:{
            url:"../assets/img/vtx/vtx22.jpg",
            alt:"",
        },        
        precio:49.95
    },
    {
        id:23,
        idCategoria:6,
        nombre:"TBS Unify Pro32 HV (MMCX)",
        descripcion:"Ultra-clean transmission (up to 16 pilots at once!)",
        image:{
            url:"../assets/img/vtx/vtx23.jpg",
            alt:"",
        },        
        precio:49.95
    },
    {
        id:24,
        idCategoria:6,
        nombre:"TBS Unify Pro 5G8 HV Race (SMA)",
        descripcion:"Distilling the smallest, lightest and most powerful video transmitters",
        image:{
            url:"../assets/img/vtx/vtx24.jpg",
            alt:"",
        },        
        precio:24.95
    },
    {
        id:25,
        idCategoria:7,
        nombre:"Caddx Ratel 2 - 2.1mm (Red)",
        descripcion:"Starlight 1200TVL 2.1mm Lens FOV 165° NTSC/PAL 16:9/4:3 ",
        image:{
            url:"../assets/img/camera/cam25.jpg",
            alt:"",
        },        
        precio:30.99
    },
    {
        id:26,
        idCategoria:7,
        nombre:"RunCam Racer Nano 4",
        descripcion:"Image Sensor: Super WDR CMOS Sensor Horizontal Resolution: 1200TVL",
        image:{
            url:"../assets/img/camera/cam26.jpg",
            alt:"",
        },        
        precio:34.99
    },
    {
        id:27,
        idCategoria:7,
        nombre:"Walksnail Avatar Camera",
        descripcion:"The Walksnail Avatar HD Camera is a digital camera that works with the Walksnail Avatar and Fat Shark HD Dominator systems",
        image:{
            url:"../assets/img/camera/cam27.jpg",
            alt:"",
        },        
        precio:59
    },
    {
        id:28,
        idCategoria:7,
        nombre:"NBD BeeEye FPV Camera",
        descripcion:"A replacement camera for the AcroBee. Can be used as a replacement camera for other applications too",
        image:{
            url:"../assets/img/camera/cam28.jpg",
            alt:"",
        },        
        precio:12.99
    },    
    {
        id:29,
        idCategoria:8,
        nombre:"Walksnail Avatar Vtx Antenna (2pcs)",
        descripcion:"The Walksnail Avatar HD VTX Antenna works with HD systems",
        image:{
            url:"../assets/img/antenna/ant29.jpg",
            alt:"",
        },        
        precio:15.90
    },
    {
        id:30,
        idCategoria:8,
        nombre:"VAS Ethix Crosshair Extreme (RHCP) 5.8GHZ",
        descripcion:"FPVs favorite patch antenna gets an Ethix makeover",
        image:{
            url:"../assets/img/antenna/ant30.jpg",
            alt:"",
        },        
        precio:37.99
    },
    {
        id:31,
        idCategoria:8,
        nombre:"VAS 5.8GHz Crosshair XTreme Diversity System",
        descripcion:"The Crosshair™ XTreme Diversity System",
        image:{
            url:"../assets/img/antenna/ant31.jpg",
            alt:"",
        },        
        precio:64.95
    },
    {
        id:32,
        idCategoria:8,
        nombre:"VAS 5.8GHz Tiny Whoop Dipole",
        descripcion:"When it comes to micro quads, every gram matters",
        image:{
            url:"../assets/img/antenna/ant32.jpg",
            alt:"",
        },        
        precio:12.99
    },        
];