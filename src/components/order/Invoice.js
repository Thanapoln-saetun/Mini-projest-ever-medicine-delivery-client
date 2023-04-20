//rafce
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

import fontDev from "./Kanit-Light.ttf";
import moment from "moment/min/moment-with-locales";

// Register font
Font.register({ family: "Kanit", src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "Kanit",
    textAlign: "center",
   


  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize  : 12,

  },
  summary: {
    textAlign: 'right',
    fontSize  : 12,
    
  }

  
});
const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize  : 20}}>Kapong Chaipat Hospital</Text>
          <Text style={{paddingBottom : 10}}>{moment(Date.now()).locale("th").format("LLLL")}</Text>

          <Table >
            <TableHeader  >
              <TableCell style={{fontSize : 12}}>รายการสินค้า</TableCell>
              <TableCell style={{fontSize : 12}}>ราคาสินค้า</TableCell>
              <TableCell style={{fontSize : 12 }}>จํานวนสินค้า</TableCell>
            </TableHeader>
          </Table>
          <Table data={order.products}>
            <TableBody>
              <DataTableCell getContent={(x) => x.product.title} />
              <DataTableCell getContent={x => x.price} />
              <DataTableCell getContent={x => x.count} />
            </TableBody>
          </Table>
          <Text style={{textAlign : 'right', fontSize  : 12 ,paddingTop : 10}}>ค่าบริการจัดส่ง : 35 บาท</Text>
          <Text style={styles.summary}>ราคารวมสุทธิ : {order.cartTotal}</Text>

        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
