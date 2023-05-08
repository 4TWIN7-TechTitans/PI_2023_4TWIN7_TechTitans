import csv
import pandas as pd
import argparse
from sklearn import preprocessing
from sklearn.linear_model import LogisticRegression
import json
from io import StringIO
from joblib import dump
from sklearn.ensemble import RandomForestClassifier

def train():

    df = pd.read_csv('C:/PI_2023_4TWIN7_TechTitans/back/scripts/statements.csv')
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
    # clf = LogisticRegression(random_state=0).fit(X_df, y)
    clf = RandomForestClassifier()
    clf.fit(X_df, y)
    
    dump(clf, 'model.joblib') 
    #print(clf)

    # print the accuracy of the model on the training set
    accuracy = clf.score(X_df, y)
  #  print(f"Accuracy: {accuracy}")
    print(accuracy)


train()