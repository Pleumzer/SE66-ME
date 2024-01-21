import React from "react";
import { Layout } from "antd";
import SidebarAnimal from "../../component/sidebarAnimal";
import AnimalInfo from "../../pages/AnimalInfo/dashboard";
import ZooHeader from "../../component/zoo.Hearder";
const { Header, Content, Footer, Sider } = Layout;

function LayoutAnimalInfo(){
    return(
        <Layout style={{minHeight:'100vh'}}>
            <ZooHeader/>
            <Layout >
                <SidebarAnimal/>
                <Content>
                    <AnimalInfo/>  
                </Content>
            </Layout>
        </Layout>

    );
};
export default LayoutAnimalInfo;