var serilog = require('serilog');
var terminal = require('serilog/src/serilog-terminal-sink');
var file = require('serilog/src/serilog-file-sink');

function getUserId(){
    return Math.random();
}
function shadowizard(options) {
    var log = serilog.configuration()
    .enrich({
        UserId: getUserId()
        })
    .filter(logEvent => logEvent.properties.Name === 'Greg')
    .writeTo(terminal())
    .writeTo(file('log.txt'))
    .createLogger();
    
    log.information('Hello {Name}!', 'Greg');

    log.information("You requested the Index page");
    try {
        for (let i = 0; i < 10; i++) {
            if (i == 6)
            {
                throw "this is our demo exception";
            }
            else {
                log.information("this value of i is {LoopCountValue} {UserId}", i);
            }
        }
    }
    catch (ex)
    {
        log.error(ex, "We caught this expection in the Index Get call.");
    }
}

module.exports.shadowizard = shadowizard;