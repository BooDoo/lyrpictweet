 //Three objects:
//bots - configuration for each lyric/picture pairing robot
//songSets - hash of {artist: [title1, title2], ...} to generate artist/title pair for song look-up
//credentials - API keys/secrets

var credentials = {
    twitter_gcatpix : 
    {
      service:              "twitter",
      consumer_key:         process.env['CAT_TWITTER_CONSUMER_KEY'],
      consumer_secret:      process.env['CAT_TWITTER_CONSUMER_SECRET'],
      access_token:         process.env['CAT_TWITTER_ACCESS_TOKEN'],
      access_token_secret:  process.env['CAT_TWITTER_ACCESS_TOKEN_SECRET']
    },
   
    twitter_cwdogpix:
    {
      service:              "twitter",
      consumer_key:         process.env['DOG_TWITTER_CONSUMER_KEY'],
      consumer_secret:      process.env['DOG_TWITTER_CONSUMER_SECRET'],
      access_token:         process.env['DOG_TWITTER_ACCESS_TOKEN'],
      access_token_secret:  process.env['DOG_TWITTER_ACCESS_TOKEN_SECRET']
    },

    twitter_ct_races:
    {
      service:              "twitter",
      consumer_key:         process.env['CTR_TWITTER_CONSUMER_KEY'],
      consumer_secret:      process.env['CTR_TWITTER_CONSUMER_SECRET'],
      access_token:         process.env['CTR_TWITTER_ACCESS_TOKEN'],
      access_token_secret:  process.env['CTR_TWITTER_ACCESS_TOKEN_SECRET']
    },

    twitter_xyisx:
    {
      service:              "twitter",
      consumer_key:         process.env['XYX_TWITTER_CONSUMER_KEY'],
      consumer_secret:      process.env['XYX_TWITTER_CONSUMER_SECRET'],
      access_token:         process.env['XYX_TWITTER_ACCESS_TOKEN'],
      access_token_secret:  process.env['XYX_TWITTER_ACCESS_TOKEN_SECRET']      
    },

    twitter_lyrpic:
    {
      service:              "twitter",
      consumer_key:         process.env['LYRPIC_TWITTER_CONSUMER_KEY'],
      consumer_secret:      process.env['LYRPIC_TWITTER_CONSUMER_SECRET'],
      access_token:         process.env['LYRPIC_TWITTER_ACCESS_TOKEN'],
      access_token_secret:  process.env['LYRPIC_TWITTER_ACCESS_TOKEN_SECRET']      
    },

    flickr_boodoo:
    {
      service:              "flickr",
      flickr_key:           process.env['BOODOO_FLICKR_KEY'],
      flickr_secret:        process.env['BOODOO_FLICKR_SECRET']
    },
    
    wordnik_boodoo:
    {
      service:              "wordnik",
      api_key:              process.env['BOODOO_WORDNIK_KEY']
    }
  },

  bots = {
    rapcats:
    {
      type:                 "lyrpictweet",
      handle:               "rapcats",
      twitter:              credentials.twitter_gcatpix,
      flickr:               credentials.flickr_boodoo,
      tags:                 "cat%2C+-caterpillar",
      lyricGenre:           "rap",
      interval:             process.env['NODE_ENV'] === 'production' ? 60000*60 : 30000
    },
    
    countrydogs:
    {
      type:                 "lyrpictweet",
      handle:               "countrydogs",
      twitter:              credentials.twitter_cwdogpix,
      flickr:               credentials.flickr_boodoo,
      tags:                 "dog",
      lyricGenre:           "country",
      interval:             process.env['NODE_ENV'] === 'production' ? 60000*60 : 30000
    },

    lyrpic:
    {
      type:                 "lyrpictweet",
      handle:               "lyrpic",
      twitter:              credentials.twitter_lyrpic,
      flickr:               credentials.flickr_boodoo,
      tags:                 "",
      lyricGenre:           "all",
      interval:             process.env['NODE_ENV'] === 'production' ? 60000*60 : 30000
    },

    camptownraces:
    {
      type:                 "syllablecount",
      handle:               "camptownraces",
      twitter:              credentials.twitter_ct_races,
      targetSyllables:      7,
      //prefix:             '',
      suffix:               ' / doo-dah, doo-dah…',
      //queueMax:             300,
      searchInterval:       process.env['NODE_ENV'] === 'production' ? 60000*10 : 30000,
      interval:             process.env['NODE_ENV'] === 'production' ? 60000*15 : 60000
    },

    xyisx:
    {
      type:                 "snowclone",
      handle:               "xyisx",
      twitter:              credentials.twitter_xyisx,
      wordnik:              credentials.wordnik_boodoo,
      format:               "<%= word1 %> <%= word2 %> is <%= word1 %>",
      words:            
      {
                    word1:
                          {
                            includePartOfSpeech: "adjective",
                            excludePartOfSpeech: "verb-intransitive",
                            hasDictionaryDef: "true",
                            limit: 10,
                            minDictionaryCount: 10,
                            minCorpusCount: 5000
                          },
                    word2:
                          {
                            includePartOfSpeech: "noun",
                            excludePartOfSpeech: "noun-plural,pronoun,noun-posessive,proper-noun-posessive,suffix,idiom,affix",
                            hasDictionaryDef: false,
                            limit: 10,
                            minDictionaryCount: 10, 
                            minCorpusCount: 5000
                          }
      },
      searchInterval:       process.env['NODE_ENV'] === 'production' ? 60000*60*2 : 60000*4,
      interval:             process.env['NODE_ENV'] === 'production' ? 60000*15   : 30000
    }
  };

module.exports.credentials = credentials;
module.exports.bots = bots;