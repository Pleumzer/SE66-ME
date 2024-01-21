import React from "react";
import { Layout } from "antd";
import SidebarAbnormal from "../../component/sidebarAbnormal";
import AbnormalReport from "../../pages/AbnormalReport/dashboard";
import ZooHeader from "../../component/zoo.Hearder";
const { Header, Content, Footer, Sider } = Layout;

function LayoutAbnormalReport(){
    return(
        <Layout style={{minHeight:'100vh'}}>
            <ZooHeader/>
            <Layout >
                <SidebarAbnormal/>
                <Content>
                    <AbnormalReport/>  
                </Content>
            </Layout>
        </Layout>

    );
};
export default LayoutAbnormalReport;