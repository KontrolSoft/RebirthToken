module.exports={
    networks:{
        development:{
            protocol: 'http',
            host: "127.0.0.1",     
            port: 8545,            
            network_id: "*",       
            gas: 5000000,           
            gasPrice: 0,  
            type: "quorum"
        },
        nodefour:{
            host: "127.0.0.1",
            port: 22003,
            network_id: "*", 
            gasPrice: 0,
            gas: 4500000
        },
        nodeseven:{
            host: "127.0.0.1",
            port: 22006,
            network_id: "*", 
            gasPrice: 0,
            gas: 4500000
        }
    },
    mocha:{},
    compilers:{
        solc:{
            version:"0.8.19"    
        }
    }
};
