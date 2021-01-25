if (!process.env.OCTOPUS_APIKEY) {
    throw new Error("Missing OCTOPUS_APIKEY");
}
var octo = require('@octopusdeploy/octopackjs');
octo.pack()
    // https://nextjs.org/docs/advanced-features/static-html-export#deployment
    // By default, next export will generate an `out` directory
    .appendSubDir('out', true)
    .toFile('.', function (err, data) {
        console.log('Package Saved: ' + data.name);
        octo.push(data.name, {
            host: 'https://pstephenson.octopus.app', 
            apikey: process.env.OCTOPUS_APIKEY,
            replace: true
        }, function(err, result) {
            if (!err) {
                console.log(result);
            }
        });
    });

