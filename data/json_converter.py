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

feature_types = [
  # 'Feature', default fallback
  'Red Light Camera',
  'Mobile Speed Camera',
  'School Zone Speed Camera',
  'School Zone',
  'Safe-T-Cam',
  'Speed Trap',
  'Noise Camera',
  'Fixed Speed Camera',
  'Surveillance Camera',
  'Tunnel Safety Camera',
  'Average Speed Camera',
  'Heavy Vehicle Safety Camera',
  'Average Tunnel Speed Camera',
  'Phone Detection Camera',
  'Variable Speed Zone',
  # 'Current Location', not included in feature set
]

# features
#  - map from [x, y, name, description, accreditation]
#  - map to { type, properties, geometry, id }

def row_to_feature(row):
    return {
        'id': 'feature-' + str(row['x']) + '-' + str(row['y']),
        'type': get_feature_type(row),
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


def get_feature_type(row):
    for t in feature_types:
        if t in row['name']: return t
    
    if 'Red-Light' in row['name']: return 'Red Light Camera'
    if 'Speed Cameras' in row['name']: return 'Fixed Speed Camera'

    return 'Feature'

mapped = df.fillna(value='').apply(row_to_feature, axis=1)

feature_set['features'] = mapped.to_list()

fw = open(out_fn, 'w')
fw.write(json.dumps(feature_set, indent=4))

print('output written to: ' + out_fn)