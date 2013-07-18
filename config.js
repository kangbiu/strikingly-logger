var config = {};
config.allowedDomains = process.env.ALLOWED_DOMAINS;
config.redisKeyTimeToExpire =  3600*24*14
config.readRedisRecordSecret = 'dafeng'
config.redisKeyPrefix = 'pageError_'

module.exports = config;