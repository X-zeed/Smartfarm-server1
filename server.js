const http = require('http');

let In_Humid = 0, In_Mois = 0, In_Temp = 0, Out_Humid = 0, Out_light = 0, Out_Temp = 0, Cooler = 0, Fan = 0, Fog = 0, Led = 0, Water = 0;

let data = {
    In: {
        Humidity: In_Humid.toString(),
        Temperature: In_Temp.toString(),
        Moisture: In_Mois.toString()

    },
    Out: {
        Humidity: Out_Humid.toString(),
        Temperature: Out_Temp.toString(),
        Light: Out_light.toString()
    },
    Output: {
        Cooler: Cooler.toString(),
        Fan: Fan.toString(),
        Fog: Fog.toString(),
        Led: Led.toString(),
        Water: Water.toString()
    }
};

const server = http.createServer((request, response) => {
    const { method, url } = request;

    let content = '';
    if (method === 'GET' && url === '/data') {
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/In_humd')) {
        const params = url.split('/');
        if (params.length === 3) {
            In_Humid = parseInt(params[2]);
            data.In.Humidity = In_Humid.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/In_temp')) {
        const params = url.split('/');
        if (params.length === 3) {
            In_Temp = parseInt(params[2]);

            data.In.Temperature = In_Temp.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/In_mois')) {
        const params = url.split('/');
        if (params.length === 3) {
            In_Mois = parseInt(params[2]);

            data.In.Moisture = In_Mois.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    }
    // Out
    else if (method === 'GET' && url.startsWith('/Out_humd')) {
        const params = url.split('/');
        if (params.length === 3) {
            Out_Humid = parseInt(params[2]);

            data.Out.Humidity = Out_Humid.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/Out_temp')) {
        const params = url.split('/');
        if (params.length === 3) {
            Out_Temp = parseInt(params[2]);

            data.Out.Temperature = Out_Temp.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/Out_light')) {
        const params = url.split('/');
        if (params.length === 3) {
            Out_light = parseInt(params[2]);

            data.Out.Light = Out_light.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    }
    // Output
    else if (method === 'GET' && url.startsWith('/cooler')) {
        const params = url.split('/');
        if (params.length === 3) {
            Cooler = parseInt(params[2]);
            data.Output.Cooler = Cooler.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/fan')) {
        const params = url.split('/');
        if (params.length === 3) {
            Fan = parseInt(params[2]);

            data.Output.Fan = Fan.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/fog')) {
        const params = url.split('/');
        if (params.length === 3) {
            Fog = parseInt(params[2]);

            data.Output.Fog = Fog.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/led')) {
        const params = url.split('/');
        if (params.length === 3) {
            Led = parseInt(params[2]);

            data.Output.Led = Led.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    } else if (method === 'GET' && url.startsWith('/water')) {
        const params = url.split('/');
        if (params.length === 3) {
            Water = parseInt(params[2]);

            data.Output.Water = Water.toString();

        }
        content = JSON.stringify(data);
        response.setHeader('Content-Type', 'application/json');
    }

    //soil
    if(In_Mois<=60){
        data.Output.Water = "1";
        setTimeout(function() {
            data.Output.Water = "0";
          }, 3000);
    }else{
        data.Output.Water = "0";
    }

    // humid
    if(In_Humid<60){
        data.Output.Fog = "1";
        data.Output.Fan = "0";
        setTimeout(function() {
            data.Output.Fog = "0";
          }, 5000);
    } else if(In_Humid>80){
        data.Output.Fan = "1";
    } else if (In_Humid <= 80 && In_Humid >= 60){
        data.Output.Fan = "0";
    } else{
        data.Output.Fog = "0";
    }

    //light
    if(Out_light < 1100){
        data.Output.Led = "1";
    } else{
        data.Output.Led = "0";
    }

    //temp
    if(In_Temp >= 30){
        data.Output.Cooler = "1";
    } else{
        data.Output.Cooler = "0";
    }






    response.statusCode = 200;
    response.end(content);

});

server.listen(8888, () => {
    console.log('Server is running at http://localhost:8888');
});
