from datetime import datetime as dt
import pandas as pd
from os import path
import json

fn = 'speed_cameras_nsw.csv'
out_fn = 'speed_cameras_nsw.json'
df = pd.read_csv(fn)

feature_set = {
    'type': "FeatureCollection",
    'generator': 'python-json-converter',
    'copyright': '',
    'timestamp': dt.now().isoformat(),
    'features': []
}

# features
#  - map from [x, y, name, description, accreditation]
#  - map to { type, properties, geometry, id }

def row_to_feature(row):
    return {
        'id': 'feature-' + str(row['x']) + '-' + str(row['y']),
        'type': 'Feature',
        'properties': {
            'name': row['name'],
            'description': row['description'],
            'accreditation': row['accreditation']
        },
        'geometry': {
            "type": "Point",
            "coordinates": [row['x'], row['y']]
        }
    }

mapped = df.fillna(value='').apply(row_to_feature, axis=1)

feature_set['features'] = mapped.to_list()

fw = open(out_fn, 'w')
fw.write(json.dumps(feature_set, indent=4))

print('output written to: ' + out_fn)