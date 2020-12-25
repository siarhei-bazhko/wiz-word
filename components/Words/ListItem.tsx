import * as React from 'react';
import { List, Button } from 'react-native-paper';

const ListItem: React.FC<{}> = ({ word: { refId, id, origin, translation }, key, userToken, deleteWord }: any) => {
  return <List.Item
    key={key}
    title={translation}
    description={origin}
    left={() => <List.Icon  icon="star-circle" />}
    right={()=> <Button icon="cancel" color="darkred" onPress={()=>deleteWord(refId, userToken)} />}
  />
};

export default ListItem;
