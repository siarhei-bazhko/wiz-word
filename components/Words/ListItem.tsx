import * as React from 'react';
import { List, Button } from 'react-native-paper';

const ListItem = ({ id, origin, translation, deleteWord }: any) => {
  console.log(id, origin);
  return <List.Item
    title={translation}
    description={origin}
    left={() => <List.Icon  icon="star-circle" />}
    right={()=> <Button icon="cancel" color="darkred" onPress={()=>deleteWord(id)} />}
  />
};

export default ListItem;
