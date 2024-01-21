import React from "react";
import { Layout } from "antd";
import SidebarAnimal from "../../component/sidebarAnimal";
import AnimalCreate from "../../pages/AnimalInfo/create";
import ZooHeader from "../../component/zoo.Hearder";
const { Header, Content, Footer, Sider } = Layout;

function LayoutAnimalCreate (){
    return(
        <Layout style={{minHeight:'100vh'}}>
            <ZooHeader/>
            <Layout>
                <SidebarAnimal/>
                <Content>
                    <AnimalCreate/>  
                </Content>
            </Layout>
        </Layout>

    );
};
export default LayoutAnimalCreate;