import pprint
import indicoio
import time
import MySQLdb
class Database:

    host = 'localhost'
    user = 'root'
    password = ''
    db = 'nytimes'

    def __init__(self):
        self.connection = MySQLdb.connect(self.host, self.user, self.password, self.db)
        self.cursor = self.connection.cursor()

    def insert(self, query):
        try:
            self.cursor.execute(query)
            self.connection.commit()
        except:
            self.connection.rollback()



    def query(self, query):
        cursor = self.connection.cursor( MySQLdb.cursors.DictCursor )
        cursor.execute(query)

        return cursor.fetchall()

    def __del__(self):
        self.connection.close()
def chunker(seq, size):
    return (seq[pos:pos + size] for pos in range(0, len(seq), size))
if __name__ == "__main__":
    start = time.time()
    articles = []
    with open("filteredArticles.txt", "r") as articleFile:
        temp = eval("".join(articleFile.readlines()))
        articles = temp
    allText = []
    num = len(articles) - 1000

    for i in range(num):
        #forDatabase.append(articles[i])
        allText.append(articles[i]["sampleText"])

    #start up indico
    indicoio.config.api_key = '1d39c9a3ab4e5550c7b88a66aaac025a'

    #connect to db
    db = MySQLdb.connect(
    host="localhost",
    user="root",
    passwd="",
    db="nytimes"
    )
    cur = db.cursor()

    sentimentValues = []
    politicalValues = []
    personalityValues = []
    emotionValues = []
    start = 3474
    itr = start
    for i in range(start, num + start):
        print("starting chunk " + str(itr) + " !")
        itr += 1
        curText = allText[i][:1000]
        sentimentValues = indicoio.sentiment_hq(curText)
        politicalValues = indicoio.political(curText)
        personalityValues = indicoio.personality(curText)
        emotionValues = indicoio.emotion(curText)
        abst = repr(allText[i]).replace("'", '').replace('"', '')
        SQLline = 'INSERT INTO `article`(`abst`, `url`, `sent`, `serv`, `gree`, `libe`, `libt`, `agre`, `cons`, `extr`, `open`, `ange`, `fear`, `joyy`, `sadd`, `surp`) VALUES ("'+ abst + '"  ,"'+repr(articles[i]["url"])+'",'+str(sentimentValues)+','+str(politicalValues["Conservative"])+','+str(politicalValues["Green"])+','+str( politicalValues["Liberal"])+','+str(politicalValues["Libertarian"])+','+str(personalityValues["agreeableness"])+','+str(personalityValues["conscientiousness"])+','+str(personalityValues["extraversion"])+','+str(personalityValues["openness"])+','+str(emotionValues["anger"])+','+str(emotionValues["fear"])+','+str(emotionValues["joy"])+','+str(emotionValues["sadness"])+','+str(emotionValues["surprise"])+')'
        cur.execute(SQLline)
        cur.connection.commit()

        time.sleep(2)


    ##push everything

    exit()

    #irrelevant
    # for i in range(num):
    #     forDatabase[i]["sent"] = sentimentValues[i]
    #     forDatabase[i]["cons"] = politicalValues[i]["Conservative"]
    #     forDatabase[i]["gree"] = politicalValues[i]["Green"]
    #     forDatabase[i]["libe"] = politicalValues[i]["Liberal"]
    #     forDatabase[i]["libt"] = politicalValues[i]["Libertarian"]
    #     forDatabase[i]["agre"] = personalityValues[i]["agreeableness"]
    #     forDatabase[i]["cons"] = personalityValues[i]["conscientiousness"]
    #     forDatabase[i]["extr"] = personalityValues[i]["extraversion"]
    #     forDatabase[i]["open"] = personalityValues[i]["openness"]
    #     forDatabase[i]["ange"] = emotionValues[i]["anger"]
    #     forDatabase[i]["fear"] = emotionValues[i]["fear"]
    #     forDatabase[i]["joyy"] = emotionValues[i]["joy"]
    #     forDatabase[i]["sadd"] = emotionValues[i]["sadness"]
    #     forDatabase[i]["surp"] = emotionValues[i]["surprise"]
