import csv
import pandas as pd
import argparse
from sklearn import preprocessing
from sklearn.linear_model import LogisticRegression
import json
from io import StringIO
from joblib import dump


def train():
    # Load data from JSON file
    # with open("C:/PI_2023_4TWIN7_TechTitans/statements.json", "r") as f:
    #    data = json.load(f)
        # construct the argument parser and parse the arguments
    # ap = argparse.ArgumentParser()
    # ap.add_argument("-d", "--dataset", required=True,
    #                 help="path to input dataset")
    # ap.add_argument("-c", "--columns", nargs='+', required=True,
    #                 help="list of columns to encode and use as features")
    # ap.add_argument("-t", "--target", required=True,
    #                 help="name of the target column to predict")
    # args = vars(ap.parse_args())

    # load the dataset and drop missing values
    # print(args(["dataset"]))
    # csv_buffer = StringIO()
    # writer = csv.writer(csv_buffer)
    # writer.writerow(data[0].keys())
    # for row in data:
    #     writer.writerow(row.values())
    # csv_data = csv_buffer.getvalue()


# Open the CSV file in read mode
    # with open('statements.csv', newline='') as csvfile:
    # # Create a reader object
    #     csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')

    #     Loop through each row in the CSV file
        #for row in csvreader:
            # Do something with the row data
       #     print(row)
       # print(csv_data)

    # df = pd.read_csv(args["dataset"])
    # df.dropna(inplace=True)
    
    df = pd.read_csv('statements.csv')
    myfeatures = ["injured" , "circumstances_a" , "circumstances_b", "material_damage", "hits_a" , "hits_b" , "apparent_damages_a" , "apparent_damages_b"]
    target = "decision"
    # initialize the label encoder
    label_encoder = preprocessing.LabelEncoder()

    # iterate over the columns to encode
    for column in myfeatures:
        # check if the column is of type 'object' (i.e. contains strings)
        if df[column].dtype == 'object':
            # fit the label encoder and transform the column
            df[column] = label_encoder.fit_transform(df[column])
         #   print(df[column])
        else:
            # otherwise, convert the column to string and encode it
            df[column] = label_encoder.fit_transform(
                df[column].astype(str))

    # encode the target column
    df[target] = label_encoder.fit_transform(df[target])

    # separate the features and target
    X = df[myfeatures]
    y = df[target]

    X_df = pd.DataFrame(X, columns=["injured" , "circumstances_a" , "circumstances_b", "material_damage", "hits_a" , "hits_b" , "apparent_damages_a" , "apparent_damages_b"])

    # train a logistic regression model
    clf = LogisticRegression(random_state=0).fit(X_df, y)
    
    dump(clf, 'model.joblib') 
    #print(clf)

    # print the accuracy of the model on the training set
    accuracy = clf.score(X, y)
  #  print(f"Accuracy: {accuracy}")
    print(accuracy)


train()