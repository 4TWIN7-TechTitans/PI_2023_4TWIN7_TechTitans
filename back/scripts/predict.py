import argparse
import json
import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder, OneHotEncoder


def predict():
    # Load data from JSON file
    # with open(data_path, 'r') as f:
        # data = json.load(f)

    # Convert data to pandas DataFrame
    # df = pd.DataFrame(data, index=[0])

    df = pd.read_csv('C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/statements.csv')
    X_df = pd.DataFrame(df, columns=["injured" , "circumstances_a" , "circumstances_b", "material_damage", "hits_a" , "hits_b" , "apparent_damages_a" , "apparent_damages_b"])
    
    features = X_df[["injured" , "circumstances_a" , "circumstances_b", "material_damage", "hits_a" , "hits_b" , "apparent_damages_a" , "apparent_damages_b"]]
    
    le = LabelEncoder()
    X_df["injured"] = le.fit_transform(X_df["injured"])
    X_df["circumstances_a"] = le.fit_transform(X_df["circumstances_a"])
    X_df["circumstances_b"] = le.fit_transform(X_df["circumstances_b"])
    X_df["material_damage"] = le.fit_transform(X_df["material_damage"])
    X_df["hits_a"] = le.fit_transform(X_df["hits_a"])
    X_df["hits_b"] = le.fit_transform(X_df["hits_b"])
    X_df["apparent_damages_a"] = le.fit_transform(X_df["apparent_damages_a"])
    X_df["apparent_damages_b"] = le.fit_transform(X_df["apparent_damages_b"])
    # onehot_enc = OneHotEncoder()
    # injured_encoded = onehot_enc.fit_transform(df['injured'].values.reshape(-1, 1))
    # material_damage_encoded = onehot_enc.fit_transform(df['material_damage'].values.reshape(-1, 1))

    # # Apply label encoding to the "circumstances_a", "circumstances_b", "hits_a", "hits_b", "apparent_damages_a", and "apparent_damages_b" columns
    # label_enc = LabelEncoder()
    # df['circumstances_a'] = label_enc.fit_transform(df['circumstances_a'])
    # df['circumstances_b'] = label_enc.fit_transform(df['circumstances_b'])
    # df['hits_a'] = label_enc.fit_transform(df['hits_a'])
    # df['hits_b'] = label_enc.fit_transform(df['hits_b'])
    # df['apparent_damages_a'] = label_enc.fit_transform(df['apparent_damages_a'])
    # df['apparent_damages_b'] = label_enc.fit_transform(df['apparent_damages_b'])

    # # Concatenate the one-hot encoded columns and the label encoded columns back into a single DataFrame
    # df_encoded = pd.concat([pd.DataFrame(injured_encoded.toarray()), pd.DataFrame(material_damage_encoded.toarray()), df.drop(['injured', 'material_damage'], axis=1)], axis=1)
    # Convert boolean features to integers
    # features['injured'] = features['injured'].astype(int)
    # features['material_damage'] = features['material_damage'].astype(int)
    # features = features.astype(float)
    # Load trained model
    model = joblib.load("model.joblib")
    # Make predictions


    predictions = model.predict(X_df)

    return predictions

if __name__ == '__main__':
    # Set up argument parser
    # parser = argparse.ArgumentParser()
    # parser.add_argument('--data_path', type=str, help='Path to JSON file containing data to be predicted')
    # parser.add_argument('--model_path', type=str, help='Path to trained model')
    # parser.add_argument('--output_path', type=str, help='Path to save predicted results')
    
    # Parse arguments
    # args = parser.parse_args()

    # Make predictions
    # predictions = predict()
    
    # print(predictions)

    # # Save predictions to file
    # with open("predictions.dump", 'w') as f:
    #    json.dump(predictions.tolist(), f)
    predictions = predict()
    if predictions[0] == 0:
        result = "for a"
    else:
        result = "for b"
    print(result)
    predictions_json = json.dumps(predictions.tolist())
    with open("predictions.dump", 'w') as f:
       f.write(predictions_json)
    print(predictions)