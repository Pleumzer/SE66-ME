import React from "react";
import { Layout } from "antd";
import SidebarAbnormal from "../../component/sidebarAbnormal";
import AbnormalReportCreate from "../../pages/AbnormalReport/create";
import ZooHeader from "../../component/zoo.Hearder";
const { Header, Content, Footer, Sider } = Layout;

function LayoutAbnormalCreate (){
    return(
        <Layout style={{minHeight:'100vh'}}>
            <ZooHeader/>
            <Layout>
                <SidebarAbnormal/>
                <Content>
                    <AbnormalReportCreate/>  
                </Content>
            </Layout>
        </Layout>

    );
};
export default LayoutAbnormalCreate;