import requests
import pprint
import math as m
def getFiltered(year, month, num):
    token = "10b57f63eece4301b913e7594916e8e1"
    URL = "https://api.nytimes.com/svc/archive/v1/" + str(year) + "/" + str(month) + ".json"
    param = {"api-key": token}

    r = requests.get(url = URL, params = param)
    try:
        data = r.json()
    except:
        return []
    if(not "response" in data):
        return []
    data = data["response"]["docs"]
    outList = []
    for oldArticle in data:
        newArticle = {}
        if "web_url" in oldArticle and "lead_paragraph" in oldArticle and "snippet" in oldArticle:
            newArticle["url"] = oldArticle["web_url"]
            newArticle["sampleText"] = oldArticle["lead_paragraph"]
            newArticle["description"] = oldArticle["snippet"]
            newArticle["year"] = year
            newArticle["month"] = month
            outList.append(newArticle)
    def sortFunc(x):
        if(x["sampleText"] == None):
            return -1
        return len(x["sampleText"])
    outList.sort(key = sortFunc, reverse = True)
    return outList[0:num]


if __name__ == "__main__":
    start = 1990
    end = 2017
    numEach = 30
    filteredArticles = []
    for iter in range((end - start) * 12):
        curYear = start + m.floor(iter / 12)
        curMonth = (iter % 12) + 1
        print("Getting articles from year " + str(curYear) + ", month " + str(curMonth) + "...")
        tempArticles = getFiltered(curYear, curMonth, numEach)
        filteredArticles += tempArticles
        print("Done! Moving on..." + str(len(filteredArticles)) + " found so far!")
    with open(r"filteredArticles.txt", "w") as output:
        toSave = str(filteredArticles)
        toSave = ''.join([i if ord(i) < 128 else '' for i in toSave])
        output.write(toSave)
