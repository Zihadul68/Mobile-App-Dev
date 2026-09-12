import React, { useMemo, useRef, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import StatBar from "../components/stat-bar";
import { useStudents } from "../context/students-context";

export default function StatisticsScreen() {
  const { students } = useStudents();
  const previousCount = useRef(students.length);
  const [countChange, setCountChange] = useState<number | null>(null);

  useEffect(() => {
    const change = students.length - previousCount.current;
    if (change !== 0) {
      setCountChange(change);
      const timer = setTimeout(() => setCountChange(null), 2000);
      previousCount.current = students.length;
      return () => clearTimeout(timer);
    }
    previousCount.current = students.length;
  }, [students.length]);

  const statistics = useMemo(() => {
    const departmentCounts = new Map<string, number>();
    const skillCounts = new Map<string, number>();
    students.forEach((student) => {
      departmentCounts.set(student.department, (departmentCounts.get(student.department) ?? 0) + 1);
      student.skills.forEach((skill) => skillCounts.set(skill, (skillCounts.get(skill) ?? 0) + 1));
    });
    const deptStats = Array.from(departmentCounts, ([label, count]) => ({ label, count })).sort((a,b) => b.count - a.count || a.label.localeCompare(b.label));
    const topSkills = Array.from(skillCounts, ([label, count]) => ({ label, count })).sort((a,b) => b.count - a.count || a.label.localeCompare(b.label)).slice(0,5);
    const totalSkills = students.reduce((sum,s) => sum+s.skills.length,0);
    const averageSkills = students.length ? totalSkills/students.length : 0;
    return { deptStats, topSkills, totalSkills, averageSkills };
  }, [students]);

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Statistics</Text><Text style={styles.subtitle}>Department breakdown and top skills from the live student list.</Text>
    {countChange !== null && <View style={styles.badge}><Text style={styles.badgeText}>{countChange > 0 ? "↑" : "↓"} {Math.abs(countChange)} {Math.abs(countChange) === 1 ? "added" : "removed"}</Text></View>}
    <View style={styles.grid}><Stat label="Total Students" value={String(students.length)} /><Stat label="Total Skills" value={String(statistics.totalSkills)} /><Stat label="Unique Skills" value={String(new Set(students.flatMap(s=>s.skills.map(x=>x.toLowerCase()))).size)} /><Stat label="Avg Skills / Student" value={statistics.averageSkills.toFixed(1)} /></View>
    <Text style={styles.section}>Department Breakdown</Text>
    {statistics.deptStats.map((item,i)=><StatBar key={item.label} label={item.label} count={item.count} total={students.length} colour={["#0D9488","#185FA5","#7C3AED","#F59E0B","#EF4444"][i%5]} />)}
    <Text style={styles.section}>Top 5 Skills</Text>
    {statistics.topSkills.map((item,i)=><StatBar key={item.label} label={item.label} count={item.count} total={statistics.topSkills[0]?.count ?? 0} colour={["#0D9488","#185FA5","#7C3AED","#F59E0B","#EF4444"][i%5]} />)}
  </ScrollView></SafeAreaView>;
}
function Stat({label,value}:{label:string;value:string}){return <View style={styles.stat}><Text style={styles.value}>{value}</Text><Text style={styles.label}>{label}</Text></View>}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:"#f8fafc"},container:{padding:16,paddingBottom:32},title:{fontSize:28,fontWeight:"800",color:"#0f172a"},subtitle:{marginTop:5,color:"#64748b"},badge:{alignSelf:"flex-start",marginTop:12,backgroundColor:"#dcfce7",borderRadius:6,paddingHorizontal:8,paddingVertical:5},badgeText:{color:"#166534",fontWeight:"700",fontSize:12},grid:{flexDirection:"row",flexWrap:"wrap",gap:12,marginTop:14},stat:{width:"47%",backgroundColor:"#fff",borderRadius:12,padding:18,borderWidth:1,borderColor:"#e2e8f0"},value:{fontSize:25,fontWeight:"800",color:"#0f172a"},label:{marginTop:5,color:"#64748b",fontSize:12},section:{fontSize:18,fontWeight:"800",color:"#0f172a",marginTop:24,marginBottom:12}});
